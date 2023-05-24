import React, { useState } from "react";
import {
  UserOutlined,
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, MenuProps } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/authReducer";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

type DashboardLayoutProps = {
  children: React.ReactNode;
  selectMenu: string;
};

export default function AdminLayout({
  children,
  selectMenu,
}: //   selectMenu,
DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const route = useRouter();
  const dispatch = useDispatch();
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode
  ): MenuItem {
    return {
      key,
      icon,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("Home", "home", <PieChartOutlined />),
    getItem("Phòng ban", "department", <DesktopOutlined />),
    getItem("Nhân viên", "employee", <UserOutlined />),
    getItem("Phương tiện", "vehicle", <TeamOutlined />),
  ];

  return (
    <Layout>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[selectMenu]}
            mode="inline"
            items={items}
            onClick={(item) =>
              item.key == "home"
                ? route.push(`/admin`)
                : route.push(`/admin/${item.key}`)
            }
          ></Menu>
        </Sider>

        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
            }}
          >
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Button type="link" onClick={() => {}} style={{ color: "black" }}>
                Admin
              </Button>
              <Button
                type="default"
                icon={<LogoutOutlined />}
                onClick={() => {
                  dispatch(clearAuth());
                }}
                // color="white"
              >
                Logout
              </Button>
            </div>
          </Header>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "0 16px" }}>{children}</Content>
          <Footer style={{ textAlign: "center" }}>Trang quản lý</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
