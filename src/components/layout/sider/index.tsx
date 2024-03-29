import { useEffect, useRef, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { useLocation, useMatches } from "react-router-dom";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setCollapsed } from "@/store/model/global-config";
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["home"]);
  const [openedKeys, setOpenedKeys] = useState<string[]>([]);

  const { collapsed } = useAppSelector((state) => state.globalConfig);
  const dispatch = useAppDispatch();

  const updateCollapsed = (isCollapsed: boolean) => {
    dispatch(setCollapsed({ collapsed: isCollapsed }));
  };

  const preWithRef = useRef<number>(0);
  // 菜单自动展开与收起
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const bodyWith = entries[0].contentRect.width;
      if (preWithRef.current === bodyWith) return;
      if (preWithRef.current <= 1200 && bodyWith >= 1200)
        updateCollapsed(false);
      if (preWithRef.current >= 1200 && bodyWith <= 1200) updateCollapsed(true);
      preWithRef.current = bodyWith;
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.unobserve(document.body);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { pathname } = useLocation();

  const matches = useMatches();

  // 选中并展开菜单项
  useEffect(() => {
    /** menuKey: menuItem */
    const menuKeysRecord: Record<string, any> = extractKeysFromTree(menuItems);

    // 被选中的菜单节点index，保证路由前缀相同就能是同一节点选中
    const index = _.findLastIndex(
      matches,
      (item) => !menuKeysRecord[item.pathname]?.children
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, collapsed]);

  const onOpenChange = (keys: string[]) => {
    setOpenedKeys(keys);
  };

  return (
    <Sider
      className="sider"
      theme="light"
      collapsed={collapsed}
      onCollapse={(value) => updateCollapsed(value)}
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
        onClick={() => updateCollapsed(!collapsed)}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Sider>
  );
};

export default SiderLayout;
