import React from "react";
import { Layout, theme } from "antd";
import HeaderLayout from "@/components/layout/header";
import SiderLayout from "@/components/layout/sider-layout";
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
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
