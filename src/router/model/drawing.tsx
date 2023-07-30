import { Sw } from "@/components/suspense";
import { lazy } from "react";
import { CustomRouteObject } from "@/interface";

const drawingRouters: CustomRouteObject[] = [
  {
    path: "drawing-board",
    element: <Sw E={lazy(() => import("@/views/drawing"))} />,
  },
];

export default drawingRouters;
