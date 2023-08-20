import { CustomRouteObject } from "@/interface";
import { Sw } from "@/components/suspense";
import { lazy } from "react";

const echartsRouters: CustomRouteObject[] = [
  {
    path: "echarts",
    element: <Sw E={lazy(() => import("@/views/echarts"))} />,
  },
];

export default echartsRouters;
