import { Breadcrumb, Layout } from "antd";
import { Link, Outlet, useMatches } from "react-router-dom";
import HeaderLayout from "@/components/layout/header";
import SiderLayout from "@/components/layout/sider";
import "./index.less";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { HomeOutlined, TableOutlined } from "@ant-design/icons";
import React, { Key, ReactElement, ReactNode } from "react";
import { MdOutlineFormatShapes } from "react-icons/md";

const { Content } = Layout;

const menuItems: ItemType[] = [
  {
    key: "/home",
    icon: <HomeOutlined />,
    label: <Link to="/home">首页</Link>,
  },
  {
    key: "/drawing-board",
    icon: <MdOutlineFormatShapes />,
    label: <Link to="/drawing-board">画板</Link>,
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

const AppLayout: React.FC = () => {
  const matches = useMatches();

  const breadcrumbItemTree = menuItems.find((item) =>
    matches.find((mat) => mat.pathname === item.key)
  );

  const getBreadcrumbItems = () => {
    const resultArr: { key: Key; title: ReactNode; menu?: any }[] = [];

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
        <SiderLayout menuItems={menuItems} />
        <Layout>
          <Breadcrumb className="breadcrumb" items={getBreadcrumbItems()} />
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
