import { CustomRouteObject } from "@/interface";
import { Sw } from "@/components/suspense";
import { lazy } from "react";

const echartsRouters: CustomRouteObject[] = [
  {
    path: "echarts",
    element: <Sw E={lazy(() => import("@/views/echarts"))} />,
    position: 3,
    name: "图表",
    icon: "BarChartOutlined",
  },
];

export default echartsRouters;
