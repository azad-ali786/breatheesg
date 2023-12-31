import React from "react";
import { Layout, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className="navbar">
      <div className="logo"><img src="./logo.svg" alt="" /></div>
      <div className="auth-buttons">
        <a href="/">
          {" "}
          <Button type="primary" shape="round" icon={<UserOutlined />}>
            Log In
          </Button>
        </a>
        <a href="/signup">
        <Button type="primary" shape="round">
          Sign Up
          </Button>
          </a>
      </div>
    </Header>
  );
};

export default Navbar;
