import { useCallback, useState, useEffect } from "react";
import { Button, Drawer, Space, Table, Spin, Input } from "antd";
// import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { list, create, get } from "../../../services/user";
// import { CreateNewUser } from "./CreateNewUser";
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

  console.log(id);
  const fetchData = useCallback(async () => {
    const res = await get(id);
    setUser(res);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  //   const onFinishCreateNewUser = async (data: any) => {
  //     setLoading(true);
  //     setNewUserDrawerVisible(false);
  //     await create(data);
  //     console.log(data);
  //     fetchData();
  //   };

  if (isLoading) return <Spin />;

  return (
    <>
      <h1>USER DETAIL</h1>
      {user?.email}
      {user?.isAdmin}
    </>
  );
};
