import { useCallback, useState, useEffect } from "react";
import { Spin, Upload, Button, message, Space } from "antd";
import { get } from "../../../services/user";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

type UserType = {
  email: string;
  isAdmin: boolean;
  isActive: boolean;
  name: string;
  id: string;
  _id: string;
};

export const UserDetail = () => {
  const [user, setUser] = useState<UserType | undefined>();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const fetchData = useCallback(async () => {
    const res = await get(id);
    setUser(res);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const props = {
    name: "file",
    action: `http://localhost:4000/users/${user?.id}/profilePhoto`,
    headers: {
      // authorization: "authorization-text",
      // Authorization: `Bearer ${sessionStorage.getItem("token") || null}`,
      "x-access-token": JSON.parse(sessionStorage.getItem("token") || ""),
    },
    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  if (isLoading) return <Spin />;

  return (
    <Space>
      <h1>USER DETAIL</h1>
      {user?.email}
      {user?.isAdmin && "Is Admin"}

      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Space>
  );
};
