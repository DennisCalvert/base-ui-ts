import { FC } from "react";
import { Card, Form, Input, Button, Checkbox, Spin } from "antd";
import { UserType } from "../../types/User";

export interface LoginFormProps {
  onLoginFinish: (data: UserType) => Promise<any>;
  onLoginFailed: (e: any) => void;
  isLoading: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({
  onLoginFinish,
  onLoginFailed,
  isLoading,
}) => {
  return (
    <Card>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onLoginFinish}
        onFinishFailed={onLoginFailed}
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            {isLoading ? <Spin /> : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
