import { FC, useState } from "react";

import { LoginForm } from "components/LoginForm";
import { LoginFormProps } from "../LoginForm";
import { SignUpForm } from "components/SignUpForm";
import { Button, Layout } from "antd";
import { UserType } from "types/User";
const { Content } = Layout;

export const Unauthenticated: FC<LoginFormProps> = ({
  onLoginFinish,
  onLoginFailed,
  isLoading,
}) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);
  const [internalIsLoading, setInternalIsLoading] = useState(isLoading);

  const handleSignUpClick = () => {
    setIsLoginFormVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginFormVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isLoginFormVisible ? (
        <Button type="primary" onClick={handleSignUpClick}>
          Sign up
        </Button>
      ) : (
        <Button type="primary" onClick={handleLoginClick}>
          Sign in
        </Button>
      )}
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoginFormVisible ? (
          <LoginForm
            onLoginFinish={onLoginFinish}
            onLoginFailed={onLoginFailed}
            isLoading={internalIsLoading}
          />
        ) : (
          <SignUpForm />
        )}
      </Content>
    </Layout>
  );
};
