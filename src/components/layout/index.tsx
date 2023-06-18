import React from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import HeaderLayout from "@/components/layout/header";
import SiderLayout from "@/components/layout/sider";
import "./index.less";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="layout">
      <HeaderLayout />
      <Layout style={{ flex: 1 }}>
        <SiderLayout />
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
