import { FC } from "react";
import {
  Form,
  Button,
  Input,
  Checkbox,
  Image,
  Upload,
  message,
  Popover,
} from "antd";
import "../index.css";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { UserType } from "types/User";
import { destroy, update } from "../../data/service";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const { Option } = Select;

interface UpdateUserProps {
  onFinish?: () => Promise<void>;
  data?: UserType;
  fetchData: () => Promise<void>;
}

export const UpdateUser: FC<UpdateUserProps> = ({
  onFinish,
  data,
  fetchData,
}) => {
  const onFinishFailed = (data: any) => {
    console.error(data);
  };

  const onDeleteUser = async (id: string) => {
    try {
      await destroy(id);
    } catch (e) {
      console.error(e);
    } finally {
      onFinish && onFinish();
    }
  };

  const onFormSubmit = async (formData: UserType) => {
    try {
      // @ts-ignore
      await update({ id: data?._id, ...formData });
    } catch (e) {
      console.error(e);
    } finally {
      if (onFinish) {
        onFinish();
      }
    }
  };

  const props = {
    name: "file",
    action: `${REACT_APP_API_URL}/users/${data?.id}/profilePhoto`,
    headers: {
      // authorization: "authorization-text",
      Authorization: `Bearer ${sessionStorage.getItem("token") || null}`,
      "x-access-token": JSON.parse(sessionStorage.getItem("token") || ""),
    },
    onChange(info: any) {
      //   if (info.file.status !== "uploading") {
      //     console.log(info.file, info.fileList);
      //   }
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
      <span className="center" style={{ paddingBottom: "25px" }}>
        <Image src={data?.imgUrl} style={{ maxWidth: "300px" }} />
        <br />
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload user photo</Button>
        </Upload>
      </span>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={data}
        onFinish={onFormSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input username!" }]}
        >
          <Input />
        </Form.Item>

        {!data?._id && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item label="Notes" name="notes">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Form.Item
          label="Is Account Verified"
          name="isAccountVerified"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>

        {/* {data?.isActive ? (
          <Button>Deactivate</Button>
        ) : (
          <Button>Activate</Button>
        )} */}
        <Popover
          trigger="click"
          title="This action can't be undone. Are you sure?"
          content={
            <Button
              // @ts-ignore
              onClick={() => onDeleteUser && onDeleteUser(data.id)}
              danger
            >
              Confirm
            </Button>
          }
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popover>

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
