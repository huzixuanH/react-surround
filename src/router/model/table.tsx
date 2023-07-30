import { Navigate } from "react-router-dom";
import { Sw } from "@/components/suspense";
import { lazy } from "react";
import { CustomRouteObject } from "@/interface";

const tableRouters: CustomRouteObject[] = [
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
        icon: "",
      },
      {
        path: "virtual",
        element: <Sw E={lazy(() => import("@/views/table/virtual"))} />,
        icon: "",
      },
    ],
  },
];

export default tableRouters;
