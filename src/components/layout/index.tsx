import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderLayout from "@/components/layout/header";
import SiderLayout from "@/components/layout/sider";
import "./index.less";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  return (
    <div className="layout">
      <HeaderLayout />
      <Layout>
        <SiderLayout />
        <Layout>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
