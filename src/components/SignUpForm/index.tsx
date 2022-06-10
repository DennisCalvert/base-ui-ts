import { FC, useState } from "react";
import { Card, Form, Input, Button, Checkbox, Spin } from "antd";
import { create } from "services/user";
import { UserType } from "../../types/User";

export const SignUpForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const onFinish = async (data: UserType) => {
    setIsLoading(true);
    try {
      await create(data);
      setIsComplete(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onFailed = () => {};

  if (isComplete) {
    return <h3>Check your email to complete signup. Thanks!</h3>;
  }

  return (
    <Card title="Sign Up">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFailed}
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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Spin /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
