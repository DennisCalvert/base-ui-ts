import { FC, useState } from "react";
import { LoginForm } from "components/LoginForm";
import { LoginFormProps } from "../LoginForm";
import { SignUpForm } from "components/SignUpForm";
import { Button, Layout } from "antd";
const { Content } = Layout;

export const Unauthenticated: FC<LoginFormProps> = ({
  onLoginFinish,
  onLoginFailed,
  isLoading,
  isAccountVerified,
}) => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleSignUpClick = () => {
    setIsLoginFormVisible(false);
  };

  const handleLoginClick = () => {
    setIsLoginFormVisible(true);
  };

  return (
    // <Layout style={{ minHeight: "100vh" }}>
    <>
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
            isLoading={isLoading}
            isAccountVerified={isAccountVerified}
          />
        ) : (
          <SignUpForm />
        )}
      </Content>
    </>
    // </Layout>
  );
};
