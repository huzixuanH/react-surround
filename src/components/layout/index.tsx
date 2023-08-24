import { Breadcrumb, Layout } from "antd";
import { Link, Outlet, useMatches } from "react-router-dom";
import HeaderLayout from "@/components/layout/header";
import SiderLayout from "@/components/layout/sider";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Key, ReactElement, ReactNode } from "react";
import { useAppSelector } from "@/hooks/redux";
import * as icons from "@/utils/menu-icon";
import _ from "lodash";
import "./index.less";

const { Content } = Layout;

const getIcon = (name: string) => {
  const Icon = icons[name];
  return <Icon />;
};

const buildMenuItems = (menuItems: any[]) => {
  const queue = [...menuItems];
  while (queue.length) {
    const item = queue.pop();
    const { key, label, children, icon } = item;
    item.label = children ? label : <Link to={key as string}>{label}</Link>;
    if (icon) item.icon = getIcon(icon);
    if (children) queue.push(...children);
  }
  return menuItems as ItemType[];
};

const AppLayout: React.FC = () => {
  const matches = useMatches();
  const { breadcrumb, menuItems } = useAppSelector(
    (state) => state.globalConfig
  );

  const antdMenuItems = buildMenuItems(_.cloneDeep(menuItems));

  const getBreadcrumbItems = () => {
    const resultArr: { key: Key; title: ReactNode; menu?: any }[] = [];

    const breadcrumbItemTree = antdMenuItems.find((item) =>
      matches.find((mat) => mat.pathname === item.key)
    );
    let tree = [breadcrumbItemTree];
    while (tree) {
      if (tree.length === 1) {
        const breadcrumbItem = tree[0] as any;
        if (!breadcrumbItem) return;
        const { key, label } = breadcrumbItem;
        resultArr.push({
          key,
          title: label.props?.children || label,
        });

        tree = breadcrumbItem.children;
      } else if (tree.length > 1) {
        const breadcrumbItem = tree.find((item) =>
          matches.find((mat) => mat.pathname === item.key)
        ) as any;
        if (!breadcrumbItem) return;

        const { key, label } = breadcrumbItem;
        resultArr.push({
          key,
          title: label.props.children,
          menu: {
            items: tree.map((item: { key: Key; label: ReactElement }) => {
              return {
                key: item.key,
                label:
                  key === item.key ? item.label.props.children : item.label,
              };
            }),
          },
        });

        tree = breadcrumbItem.children;
      }
    }

    return resultArr;
  };

  return (
    <div className="layout">
      <HeaderLayout />
      <Layout>
        <SiderLayout menuItems={antdMenuItems} />
        <Layout>
          {breadcrumb && (
            <Breadcrumb className="breadcrumb" items={getBreadcrumbItems()} />
          )}
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
