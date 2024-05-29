import { FC, useState } from "react";
import { Card, Form, Input, Button, Checkbox, Spin } from "antd";
import { create } from "services/user";
import { UserType } from "../../types/User";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

export const SignUpForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

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
    return (
      <div>
        <h3>Check your email to complete signup. Thanks!</h3>
        <Link to="/">Sign in</Link>
      </div>
    );
  }

  return (
    <>
      <h2>Create your free account</h2>
      <p>
        Already have an account? <Link to="/">Log in</Link>
      </p>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFailed}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item
          label="Business Name"
          name="businessName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="login-input" />
        </Form.Item>
        <Form.Item
          label="Website"
          name="website"
          //   rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="login-input" />
        </Form.Item>
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

        {/* <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password className="login-input" />
        </Form.Item> */}

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          //   wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            style={{ width: "100%" }}
          >
            {isLoading ? <Spin /> : "CREATE ACCOUNT"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
