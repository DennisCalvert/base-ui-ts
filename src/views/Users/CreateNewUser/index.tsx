import { FC } from "react";
import { Form, Button, Input, Checkbox, Image, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UserType } from "../../../types/User";

interface CreateNewUserProps {
  onFinish: (data: UserType) => Promise<void>;
  data?: UserType;
  fetchData: () => Promise<void>;
}

export const CreateNewUser: FC<CreateNewUserProps> = ({
  onFinish,
  data,
  fetchData,
}) => {
  const onFinishFailed = (data: any) => {
    console.log(data);
  };

  const props = {
    name: "file",
    // action: `http://localhost:4000/users/${data?.id}/profilePhoto`,
    action: `https://base-api-ts.herokuapp.com/users/${data?.id}/profilePhoto`,
    headers: {
      // authorization: "authorization-text",
      Authorization: `Bearer ${sessionStorage.getItem("token") || null}`,
      "x-access-token": JSON.parse(sessionStorage.getItem("token") || ""),
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        fetchData();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <Image src={data?.imgUrl} />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
