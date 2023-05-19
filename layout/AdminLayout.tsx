import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CarOutlined,
  VideoCameraOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, MenuProps, Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { Diagnostic } from "typescript";

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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>Trang quản lý</Footer>
      </Layout>
    </Layout>
  );
}
