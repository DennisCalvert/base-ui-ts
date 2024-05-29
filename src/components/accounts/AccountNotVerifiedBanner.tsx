import { Button } from "antd";
import { FC } from "react";

export const AccountNotVerifiedBanner: FC = () => {
  return (
    <>
      To keep your account safe and secure, we’ve sent an email to verify your
      email address and activate your account.
      <Button type="link">Resend confirmation email.</Button>
    </>
  );
};
