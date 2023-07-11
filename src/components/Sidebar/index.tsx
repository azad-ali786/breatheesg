import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  FileAddOutlined,
  FileSearchOutlined,
  BankOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import Profile from "../Profile";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img
            src="./logo.svg"
            alt="Company Logo"
            className="sidebar-logo-image"
          />
        </div>
        <div className="sidebar-toggle" onClick={toggleMenu}>
          {collapsed ? (
            <MenuUnfoldOutlined style={{ color: "#fff" }} />
          ) : (
            <MenuFoldOutlined style={{ color: "#fff" }} />
          )}
        </div>
      </div>
      <Profile collapsed={collapsed}/>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.SubMenu key="1" icon={<BankOutlined />} title="ESG">
          <Menu.Item key="2" icon={<FileAddOutlined />}>
            Create Report
          </Menu.Item>
          <Menu.Item key="3" icon={<FileSearchOutlined />}>
            View All Reports
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="4" icon={<BankOutlined />}>
          Business Management
        </Menu.Item>
      </Menu>
      {!collapsed ? (
        <Button block className="help-button">
          Go To Help Center
        </Button>
      ) : (
        ""
      )}
    </Sider>
  );
};

export default Sidebar;
