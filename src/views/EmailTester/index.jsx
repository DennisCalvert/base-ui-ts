import { Button } from "antd";
// const { Textarea } = Input;

export const EmailTester = () => {
  //   return <Textarea />;
  return (
    <div>
      <textarea style={{ border: "0", width: "500px", height: "700px" }} />
      <Button>Save</Button>
    </div>
  );
};