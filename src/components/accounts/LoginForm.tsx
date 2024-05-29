import { FC } from "react";
import { Form, Input, Button, Checkbox, Spin, Alert } from "antd";
import { UserType } from "../../types/User";
import "./index.css";
import { AuthType } from "hooks/useUser";
import { Link } from "react-router-dom";

export interface LoginFormProps {
  auth: AuthType;
  // onLoginFinish: (data: UserType) => Promise<any>;
  // onLoginFailed: (e: any) => void;
  // isLoading: boolean;
  // isAccountVerified?: boolean | null;
}

export const LoginForm: FC<LoginFormProps> = ({ auth }) => {
  return (
    <>
      <h2>Log in</h2>
      <p>
        Don't have an account? <Link to="./registration">Sign Up</Link>
      </p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={({ email, password }) => auth.login(email, password)}
        // onFinishFailed={onLoginFailed}
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
            disabled={auth.isLoading}
          >
            {auth.isLoading ? <Spin /> : "Login"}
          </Button>
        </Form.Item>
        {auth.isAccountVerified === false && (
          <Alert message="Verify your email address" type="error" closable />
        )}
      </Form>
    </>
  );
};
