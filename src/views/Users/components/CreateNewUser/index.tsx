import { FC, useState } from "react";
import {
  Form,
  Button,
  Input,
  Checkbox,
  Image,
  Upload,
  message,
  Select,
  Space,
  Popover,
} from "antd";
import "../index.css";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { UserType } from "../../../../types/User";
import { list, create, destroy, update } from "../../data/service";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// const { Option } = Select;

interface CreateNewUserProps {
  onFinish?: () => Promise<void>;
  data?: UserType;
  // fetchData: () => Promise<void>;
}

export const CreateNewUser: FC<CreateNewUserProps> = ({
  onFinish,
  data,
  // fetchData,
}) => {
  const [isLoading, setLoading] = useState(false);

  const onFinishFailed = (data: any) => {
    console.error(data);
  };

  // const onDeleteUser = async (id: string) => {
  //   setLoading(true);
  //   try {
  //     await destroy(id);
  //     // fetchData();
  //   } catch (e) {
  //     console.error(e);
  //   } finally {
  //     setLoading(false);
  //     onFinish && onFinish();
  //   }
  // };

  const onFormSubmit = async (formData: UserType) => {
    // console.log(data);
    setLoading(true);
    try {
      // if (data?.id) {
      // @ts-ignore
      // await update({ id: data.id, ...formData });
      // } else {
      const res = await create(formData);
      console.log(res);
      // }
      // fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      if (onFinish) {
        onFinish();
      }
      // setUpdateUserDrawerVisible(false);
    }
  };

  // const props = {
  //   name: "file",
  //   // action: `http://localhost:4000/users/${data?.id}/profilePhoto`,
  //   action: `${REACT_APP_API_URL}/users/${data?.id}/profilePhoto`,
  //   headers: {
  //     // authorization: "authorization-text",
  //     Authorization: `Bearer ${sessionStorage.getItem("token") || null}`,
  //     "x-access-token": JSON.parse(sessionStorage.getItem("token") || ""),
  //   },
  //   onChange(info: any) {
  //     // if (info.file.status !== "uploading") {
  //     //   console.log(info.file, info.fileList);
  //     // }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //       fetchData();
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };
  // console.log(data);
  return (
    <>
      {/* <span className="center" style={{ paddingBottom: "25px" }}>
        <Image src={data?.imgUrl} style={{ maxWidth: "300px" }} />
        <br />
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload user photo</Button>
        </Upload>
      </span> */}
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
          rules={[{ required: true, message: "Please input email" }]}
        >
          <Input />
        </Form.Item>

        {!data?._id && (
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        {/* <Form.Item
          label="Bio"
          name="bio"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.TextArea />
        </Form.Item> */}

        <Form.Item
          label="Notes"
          name="notes"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        {/* 
        <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked">
          <Checkbox />
        </Form.Item> */}

        {/* <Form.Item
          label="Is Account Verified"
          name="isAccountVerified"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item> */}
        {/* 
        {data?.isActive ? (
          <Button>Deactivate</Button>
        ) : (
          <Button>Activate</Button>
        )}
        <Popover
          trigger="click"
          title="This action can't be undone. Are you sure?"
          content={
            <Button
              // @ts-ignore
              onClick={() => onDeleteUser && onDeleteUser(data.id)}
              // disabled={isLoading}
              danger
            >
              Confirm
            </Button>
          }
        >
          <Button danger>
            <DeleteOutlined />
          </Button>
        </Popover> */}

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
          style={{ textAlign: "right" }}
        >
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
