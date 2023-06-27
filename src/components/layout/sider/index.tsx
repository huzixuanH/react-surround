import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import _ from "lodash";
import "./index.less";

const { Sider } = Layout;

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

const SiderLayout: React.FC<{ menuItems: ItemType[] }> = ({ menuItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["home"]);
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  /** menuKey: isSubMenu */
  const menuKeysRecord: Record<string, boolean> =
    extractKeysFromTree(menuItems);

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
    const index = _.findLastIndex(
      matches,
      () => (item) => menuKeysRecord[item.pathname] === false
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
    if (selectedKeys?.[0] !== key) navigate(key);
  };

  const onOpenChange = (keys: string[]) => {
    setOpenedKeys(keys);
  };

  return (
    <Sider
      className="sider"
      theme="light"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="menu-box">
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openedKeys}
          items={menuItems}
          onClick={(item) => onMenuItemClick(item)}
          onOpenChange={onOpenChange}
        />
      </div>
      <Button
        className="collapse-btn"
        type="text"
        block
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
};

export default SiderLayout;
