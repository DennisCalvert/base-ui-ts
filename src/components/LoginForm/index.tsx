import { FC } from "react";
import { Card, Form, Input, Button, Checkbox, Spin, Alert } from "antd";
import { UserType } from "../../types/User";
import "./index.css";

export interface LoginFormProps {
  onLoginFinish: (data: UserType) => Promise<any>;
  onLoginFailed: (e: any) => void;
  isLoading: boolean;
  isAccountVerified?: boolean | null;
}

export const LoginForm: FC<LoginFormProps> = ({
  onLoginFinish,
  onLoginFailed,
  isLoading,
  isAccountVerified,
}) => {
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onLoginFinish}
      onFinishFailed={onLoginFailed}
      autoComplete="off"
      className="login-form"
    >
      <Form.Item
        label="Username"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input className="login-input" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password className="login-input" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          disabled={isLoading}
        >
          {isLoading ? <Spin /> : "Login"}
        </Button>
      </Form.Item>
      {isAccountVerified === false && (
        <Alert message="Verify your email address" type="error" closable />
      )}
    </Form>
  );
};
