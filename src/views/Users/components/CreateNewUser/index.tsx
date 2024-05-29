import { FC, useState } from "react";
import { Form, Button, Input } from "antd";
import "../index.css";
import { UserType } from "types/User";
import { create } from "views/Users/data/service";

interface CreateNewUserProps {
  onFinish?: () => Promise<void>;
  data?: UserType;
}

export const CreateNewUser: FC<CreateNewUserProps> = ({ onFinish, data }) => {
  const [isLoading, setLoading] = useState(false);

  const onFinishFailed = (data: any) => {
    console.error(data);
  };

  const onFormSubmit = async (formData: UserType) => {
    setLoading(true);
    try {
      await create(formData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      if (onFinish) {
        onFinish();
      }
    }
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={data}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right" }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
