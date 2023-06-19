import React, { Key, useEffect, useState } from "react";
import { TableOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useLocation, useMatches, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const menuItems: ItemType[] = [
  {
    key: "/home",
    icon: <TableOutlined />,
    label: "首页",
  },
  {
    key: "/table",
    icon: <TableOutlined />,
    label: "表格",
    children: [
      {
        key: "/table/basic",
        label: "基本表格",
      },
      {
        key: "/table/virtual",
        label: "虚拟列表",
      },
    ],
  },
];

function extractKeysFromTree(tree: ItemType[], result: Key[] = []) {
  for (const item of tree) {
    result.push(item.key);
    if ((item as any).children)
      extractKeysFromTree((item as any).children, result);
  }
}

const menuKeys: string[] = [];
extractKeysFromTree(menuItems, menuKeys);

const SiderLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["home"]);
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

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

  const { pathname } = useLocation();

  const matches = useMatches();

  useEffect(() => {
    const index = matches.findLastIndex((item) =>
      menuKeys.includes(item.pathname)
    );
    if (index !== -1) {
      setSelectedKeys([matches[index].pathname]);
      if (index > 0) setOpenedKeys([matches[index - 1].pathname]);
    }
  }, [pathname]);

  const navigate = useNavigate();

  const onMenuItemClick = ({ key }: { key: string; keyPath: string[] }) => {
    navigate(key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenedKeys(keys);
  };

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
        selectedKeys={selectedKeys}
        openKeys={openedKeys}
        items={menuItems}
        onClick={(item) => onMenuItemClick(item)}
        onOpenChange={onOpenChange}
      />
    </Sider>
  );
};

export default SiderLayout;
