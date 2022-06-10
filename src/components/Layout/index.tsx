import { useState, FC, ReactNode, useContext } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { UserContext } from "context/user";

const { Content, Footer, Sider } = Layout;

interface Props {
  children: ReactNode;
  logout: () => void;
}

export const AppLayout: FC<Props> = ({ children, logout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const user = useContext(UserContext);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" style={{ height: "64px" }} />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UnorderedListOutlined />}>
            <Link to={`/inventory/${user._id}`}>Inventory Tool</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LayoutOutlined />}>
            <Link to="/email">Email Preview</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<LayoutOutlined />}>
            <Link to="/gear-finder">Gear Finder</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<LayoutOutlined />}>
            <Link to="/permissions">Roles</Link>
          </Menu.Item>
          <Menu.Item key="7" onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        {/* <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ justifyContent: "flex-end" }}
          >
            <Menu.Item key="3" onClick={logout}>
              Logout <LogoutOutlined />
            </Menu.Item>
          </Menu>
        </Header> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Dennis Calvert ©2022</Footer>
      </Layout>
    </Layout>
  );
};
