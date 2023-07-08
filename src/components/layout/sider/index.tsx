import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useLocation, useMatches } from "react-router-dom";
import _ from "lodash";
import "./index.less";

const { Sider } = Layout;

function extractKeysFromTree(tree: ItemType[]) {
  let result = {};
  for (const item of tree) {
    const menuItem = item as ItemType & { children?: [] };
    result[item.key] = menuItem;
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
  const menuKeysRecord: Record<string, any> = extractKeysFromTree(menuItems);

  // 菜单展开与收起
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

  // 选中并展开菜单项
  useEffect(() => {
    // 被选中的菜单节点index，保证路由前缀相同就能是同一节点选中
    const index = _.findLastIndex(
      matches,
      () => (item) => !menuKeysRecord[item.pathname].children
    );
    if (index !== -1) {
      const opens = [];
      setSelectedKeys([matches[index].pathname]);

      // 展开选中节点的所有父结点
      if (index > 0) {
        for (let i = 0; i < index; i++) {
          if (menuKeysRecord[matches[i].pathname])
            opens.push(matches[i].pathname);
        }
      }
      if (!collapsed) setOpenedKeys(opens);
    }
  }, [pathname, collapsed]);

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
