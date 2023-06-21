import { Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Title, Link } = Typography;

function Home() {
  return (
    <>
      <Title level={2}>
        <Link
          href="https://github.com/huzixuanH/react-surround"
          target="_blank"
          style={{ fontSize: 30 }}
        >
          <GithubOutlined />
        </Link>
      </Title>
    </>
  );
}

export default Home;
