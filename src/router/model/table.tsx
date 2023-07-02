import { Navigate, RouteObject } from "react-router-dom";
import { SuspenseWrapper as Sw } from "@/components/suspense";
import { lazy } from "react";

const tableRouters: RouteObject[] = [
  {
    path: "table",
    children: [
      {
        index: true,
        element: <Navigate to="basic" />,
      },
      {
        path: "basic",
        element: <Sw E={lazy(() => import("@/views/table/basic"))} />,
      },
      {
        path: "virtual",
        element: <Sw E={lazy(() => import("@/views/table/virtual"))} />,
      },
    ],
  },
];

export default tableRouters;
