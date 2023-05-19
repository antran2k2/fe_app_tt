import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  CarOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";
import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { Diagnostic } from "typescript";
const { Header, Sider, Content } = Layout;

type DashboardLayoutProps = {
  children: React.ReactNode;
  selectMenu: string;
};

export default function UserLayout({
  children,
  selectMenu,
}: //   selectMenu,
DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const route = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[selectMenu]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
              onClick: () => {
                route.push("/user/department");
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
              onClick: () => {
                route.push("/user/employee");
              },
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
              onClick: () => {
                route.push("/user/vehicle");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <main>{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
}
