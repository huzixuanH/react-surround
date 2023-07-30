import { Button, Checkbox, Form, Image, Input } from "antd";
import { Link } from "react-router-dom";
import { GithubOutlined } from "@ant-design/icons";
import logo from "@/assets/img/logo.png";
import "./index.less";

function Login() {
  return (
    <div className="container">
      <div className="box">
        <Form>
          <Form.Item className="logo">
            <Image width={150} src={logo} preview={false} />
          </Form.Item>
          <Form.Item>
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item>
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item className="setting">
            <Checkbox>自动登录</Checkbox>
            <Link to=".">忘记密码</Link>
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="login-btn">
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <div className="other">
              其他方式登录：
              <GithubOutlined />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
