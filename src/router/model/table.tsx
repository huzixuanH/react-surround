import { Navigate } from "react-router-dom";
import { Sw } from "@/components/suspense";
import { lazy } from "react";
import { CustomRouteObject } from "@/interface";

const tableRouters: CustomRouteObject[] = [
  {
    path: "table",
    position: 4,
    name: "表格",
    icon: "TableOutlined",
    children: [
      {
        index: true,
        element: <Navigate to="basic" />,
      },
      {
        path: "basic",
        element: <Sw E={lazy(() => import("@/views/table/basic"))} />,
        icon: "",
        name: "基本表格",
      },
      {
        path: "virtual",
        element: <Sw E={lazy(() => import("@/views/table/virtual"))} />,
        icon: "",
        name: "虚拟表格",
      },
    ],
  },
];

export default tableRouters;
