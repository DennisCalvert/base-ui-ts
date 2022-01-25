import { FC, useContext } from "react";
import { Form, Button, Input, Upload, message, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { iInventory } from "./types";
import { UserContext } from "context/user";
import { v4 as uuid4 } from "uuid";
import { InventoryImage } from "./shared";
const { TextArea } = Input;

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
  const user = useContext(UserContext);
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
    action: `http:/${process.env.REACT_APP_API_URL}/inventory/upload/${data?.id}`,
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
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <InventoryImage
          userId={user._id}
          itemId={data?.id}
          alt={data?.name}
          style={{ display: "block", margin: "0 auto" }}
        />
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Space>
      <br />
      <br />
      <br />
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={data}
        onFinish={data ? onFinishUpdate : onFinishCreate}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please Add a Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={7} />
        </Form.Item>
        {/* <Form.Item label="Value" name="value">
          <Input type="number" prefix="$" />
        </Form.Item> */}
        {/* 
        {data?.meta &&
          data.meta.map((meta: iMeta, i: number) =>
            Object.keys(meta).map((key: string) => (
              // @ts-ignore
              //   getFieldDecorator(`meta[${index}][${key}]`)(
              //     <Input placeholder="Base Price" />
              //   )
              <Form.Item label={key} name={`meta-${key}`}>
                <Input defaultValue={meta[key]} />
              </Form.Item>
            ))
          )} */}

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
