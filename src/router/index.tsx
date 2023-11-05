import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout";
import Login from "@/views/login";
import { lazy } from "react";
import { Sw } from "@/components/suspense";
import { CustomRouteObject } from "@/interface";
import { store } from "@/store";
import { setMenuItems } from "@/store/model/global-config";

const buildMenuItems = (nodes: CustomRouteObject[], pathPrefix: string) => {
  const menus = [];
  nodes.forEach((node) => {
    const { path, children, name, icon } = node;
    if (!path) return;
    const key = `${pathPrefix}/${path}`;
    const menuItem = {
      key,
      icon,
      label: name,
    };
    if (children) {
      (menuItem as any).children = buildMenuItems(children, key);
    }

    menus.push(menuItem);
  });
  return menus;
};

const rootRouter = (function generateRootRouter() {
  // const importModelObject = import.meta.glob("./model/*.tsx", { eager: true });
  const routerArray: CustomRouteObject[] = [];

  let importModelObject = {};
  if (!Object.keys(import.meta || {})?.length) {
    const requireModule = require.context("./model/", true, /\.tsx$/);
    requireModule.keys().forEach((fileName) => {
      importModelObject[fileName] = requireModule(fileName);
    });
  } else {
    importModelObject = import.meta.glob("./model/*.tsx", { eager: true });
  }

  Object.values(importModelObject).forEach((item) => {
    Object.values(item).forEach((exportItem: CustomRouteObject[]) => {
      routerArray.push(...exportItem);
    });
  });

  const browserRouters = [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        ...routerArray,
        {
          index: true,
          element: <Navigate to="/home" />,
        },
        {
          path: "*",
          element: <Sw E={lazy(() => import("@/views/error/404"))} />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const menusInRoute = routerArray
    .filter((router) => !!router.position)
    .sort((r1, r2) => +r1.position - +r2.position);

  store.dispatch(setMenuItems({ menuItems: buildMenuItems(menusInRoute, "") }));

  return createBrowserRouter(browserRouters);
})();

export default rootRouter;
