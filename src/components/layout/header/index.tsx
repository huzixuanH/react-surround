import { Layout, theme, Space, Image, Typography } from "antd";
import logo from "@/assets/img/logo.png";
import "./index.less";

const { Header } = Layout;
const { Title } = Typography;

const HeaderLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      className="header"
      style={{
        background: colorBgContainer,
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
