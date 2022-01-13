import { FC, ReactNode } from "react";
import { Form, Button, Input, Checkbox } from "antd";
import { UserType } from "../../../types/User";

interface CreateNewUserProps {
  onFinish: (data: UserType) => Promise<void>;
  data?: UserType;
}

export const CreateNewUser: FC<CreateNewUserProps> = ({ onFinish, data }) => {
  const onFinishFailed = (data: any) => {
    console.log(data);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={data}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
        style={{ textAlign: "right" }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
