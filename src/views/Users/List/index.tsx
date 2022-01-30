import { useCallback, useState, useEffect } from "react";
import {
  Button,
  Drawer,
  Space,
  Table,
  Spin,
  Popover,
  Avatar,
  Image,
} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { list, create, destroy, update } from "services/user";
import { CreateNewUser } from "../CreateNewUser";
import { UserType } from "types/User";
import { Link } from "react-router-dom";

export const UsersList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPageLoading, setPageLoading] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isNewUserDrawerVisible, setNewUserDrawerVisible] = useState(false);
  const [isUpdateUserDrawerVisible, setUpdateUserDrawerVisible] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();

  const fetchData = useCallback(async () => {
    const res = await list();
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

  const onCreateNewUser = async (data: UserType) => {
    setLoading(true);
    try {
      await create(data);
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setNewUserDrawerVisible(false);
    }
  };

  const onUpdateUser = async (data: UserType) => {
    setLoading(true);
    try {
      await update({ ...selectedUser, ...data });
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setUpdateUserDrawerVisible(false);
    }
  };

  const onDeleteUser = async (id: string) => {
    setLoading(true);
    try {
      await destroy(id);
      fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      // title: ""
      dataIndex: "id",
      key: "id",
      render: (id: string, user: UserType) => (
        <Avatar src={<Image src={user.imgUrl} style={{ width: 32 }} />} />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string, user: UserType) => (
        <Link type="link" to={`/inventory/${user.id}`}>
          {email}
        </Link>
      ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, user: UserType) =>
        isAdmin ? <CheckCircleOutlined /> : "-",
      // isAdmin ? <CheckCircleOutlined /> : <CloseCircleOutlined />,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (email: string, user: UserType) => (
        <Space>
          <Button onClick={() => showUpdateDrawer(user)}>
            <EditOutlined />
          </Button>
          {/* {u.isActive ? (
              <Button>Deactivate</Button>
            ) : (
              <Button>Deactivate</Button>
            )} */}
          <Popover
            trigger="click"
            title="This action can't be undone. Are you sure?"
            content={
              <Button
                onClick={() => onDeleteUser(user.id)}
                disabled={isLoading}
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
        </Space>
      ),
    },
  ];

  if (isPageLoading) return <Spin />;

  return (
    <>
      <Space direction="vertical">
        <Button type="primary" onClick={showDrawer}>
          New User
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={users}
        // pagination={{ position: ["topRight"] }}
      />

      <Drawer
        title="Create New User"
        placement="right"
        onClose={hideDrawer}
        visible={isNewUserDrawerVisible}
        destroyOnClose
      >
        <CreateNewUser onFinish={onCreateNewUser} fetchData={fetchData} />
      </Drawer>
      <Drawer
        title="Update User"
        placement="right"
        onClose={hideUpdateDrawer}
        visible={isUpdateUserDrawerVisible}
        destroyOnClose
      >
        <CreateNewUser
          onFinish={onUpdateUser}
          data={selectedUser}
          fetchData={fetchData}
        />
      </Drawer>
    </>
  );
};
