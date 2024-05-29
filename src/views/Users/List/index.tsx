import { useCallback, useState, useEffect } from "react";
import { Button, Drawer, Space, Table, Avatar, Image, Skeleton } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { list } from "views/Users/data/service";
import { CreateNewUser } from "../components/CreateNewUser";
import { UpdateUser } from "views/Users/components/UpdateUser";
import { UserType } from "types/User";

export const UsersList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPageLoading, setPageLoading] = useState(true);
  const [isNewUserDrawerVisible, setNewUserDrawerVisible] = useState(false);
  const [isUpdateUserDrawerVisible, setUpdateUserDrawerVisible] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();

  const fetchData = useCallback(async () => {
    const res: UserType[] = await list();
    setUsers(res);
    setPageLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showDrawer = () => setNewUserDrawerVisible(true);
  const hideDrawer = () => setNewUserDrawerVisible(false);
  const showUpdateDrawer = (data: UserType) => {
    setSelectedUser(data);
    setUpdateUserDrawerVisible(true);
  };
  const hideUpdateDrawer = () => setUpdateUserDrawerVisible(false);

  const onUpdateUser = async () => {
    fetchData();
    setNewUserDrawerVisible(false);
    setUpdateUserDrawerVisible(false);
  };

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      render: (id: string, user: UserType) => (
        <Avatar
          src={
            <Image
              src={
                user.imgUrl ||
                "https://magiccityfilmmakers.s3.us-east-2.amazonaws.com/62a2b18926b09cb95fc72e99/uploads/inventory/s/84d4506f-03fe-4cf6-80a0-08b199095595.jpeg"
              }
              style={{ width: 32 }}
            />
          }
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string, user: UserType) => (
        <Button type="link" onClick={() => showUpdateDrawer(user)}>
          {email}
        </Button>
      ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, user: UserType) =>
        isAdmin ? <CheckCircleOutlined /> : "-",
    },
  ];

  if (isPageLoading) return <Skeleton />;

  return (
    <>
      <Space direction="vertical">
        <Button type="primary" onClick={showDrawer}>
          New User
        </Button>
      </Space>
      <Table columns={columns} dataSource={users} />

      <Drawer
        title="Create New User"
        placement="right"
        onClose={hideDrawer}
        visible={isNewUserDrawerVisible}
        destroyOnClose
      >
        <CreateNewUser onFinish={onUpdateUser} />
      </Drawer>
      <Drawer
        title="Update User"
        placement="right"
        onClose={hideUpdateDrawer}
        visible={isUpdateUserDrawerVisible}
        size="large"
        destroyOnClose
      >
        <UpdateUser
          onFinish={onUpdateUser}
          data={selectedUser}
          fetchData={fetchData}
        />
      </Drawer>
    </>
  );
};
