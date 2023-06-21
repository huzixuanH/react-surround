import React, { useEffect, useState } from "react";
import { HomeOutlined, TableOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link, useLocation, useMatches, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const menuItems: ItemType[] = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: <Link to="/home">首页</Link>,
  },
  {
    key: "/table",
    icon: <TableOutlined />,
    label: "表格",
    children: [
      {
        key: "/table/basic",
        label: <Link to="/table/basic">基本表格</Link>,
      },
      {
        key: "/table/virtual",
        label: <Link to="/table/virtual">虚拟列表</Link>,
      },
    ],
  },
];

function extractKeysFromTree(tree: ItemType[]) {
  let result = {};
  for (const item of tree) {
    const menuItem = item as ItemType & { children?: [] };
    result[item.key] = !!menuItem?.children;
    if (menuItem.children) {
      result = {
        ...result,
        ...extractKeysFromTree(menuItem.children),
      };
    }
  }
  return result;
}

/** menuKey: isSubMenu */
const menuKeysRecord: Record<string, boolean> = extractKeysFromTree(menuItems);

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
    const index = matches.findLastIndex(
      (item) => menuKeysRecord[item.pathname] === false
    );
    if (index !== -1) {
      const opens = [];
      setSelectedKeys([matches[index].pathname]);
      if (index > 0) {
        for (let i = 0; i < index; i++) {
          if (menuKeysRecord[matches[i].pathname])
            opens.push(matches[i].pathname);
        }
      }
      if (!collapsed) setOpenedKeys(opens);
    }
  }, [pathname, collapsed]);

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
