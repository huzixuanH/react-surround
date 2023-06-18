import React, { useEffect, useState } from "react";
import { TableOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SiderLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const bodyWith = entries[0].contentRect.width;
      if (bodyWith > 1200) setCollapsed(false);
      if (bodyWith < 1200) setCollapsed(true);
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
  }, []);

  const navigate = useNavigate();

  const onClick = ({ keyPath }: { key: string; keyPath: string[] }) => {
    const path = keyPath.reverse().join("/");
    navigate(path);
  };

  const menuTimes: ItemType[] = [
    {
      key: "table",
      icon: <TableOutlined />,
      label: "表格",
      children: [
        {
          key: "basic",
          label: "基本表格",
        },
        {
          key: "virtual",
          label: "虚拟列表",
        },
      ],
    },
  ];

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["basic"]}
        items={menuTimes}
        onClick={(item) => onClick(item)}
      />
    </Sider>
  );
};

export default SiderLayout;
