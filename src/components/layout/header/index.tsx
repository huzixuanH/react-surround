import React from "react";
import { Layout, theme, Space, Image, Typography } from "antd";
import logo from "@/assets/img/logo.png";

const { Header } = Layout;
const { Title } = Typography;

const HeaderLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        height: 48,
        display: "flex",
        margin: "0 16px",
      }}
    >
      <Space size={12}>
        <Image preview={false} width={32} src={logo} />
        <Title style={{ marginBottom: 0 }} level={3}>
          Surround
        </Title>
      </Space>
    </Header>
  );
};

export default HeaderLayout;
