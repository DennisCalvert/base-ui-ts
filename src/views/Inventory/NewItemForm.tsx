import { FC } from "react";
import { Form, Button, Input, Image, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { iInventory } from "./types";
import { v4 as uuid4 } from "uuid";

interface Props {
  handleCreateNewItem: (data: iInventory) => void;
  handleUpdateItem: (data: iInventory) => void;
  data?: iInventory;
  parentId?: string | undefined;
}

export const NewItemForm: FC<Props> = ({
  handleCreateNewItem,
  handleUpdateItem,
  data,
  parentId,
}) => {
  const onFinishCreate = (formData: iInventory) => {
    handleCreateNewItem({
      ...formData,
      parentId,
      id: uuid4(),
    });
  };

  const onFinishUpdate = (formData: iInventory) => {
    console.log(formData);
    handleUpdateItem({ ...data, ...formData });
  };

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
        // fetchData();
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
        onFinish={data ? onFinishUpdate : onFinishCreate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        {/* 
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item> */}
        {/* 
        <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked">
          <Checkbox />
        </Form.Item> */}

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
