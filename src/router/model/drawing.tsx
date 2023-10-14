import { Sw } from "@/components/suspense";
import { lazy } from "react";
import { CustomRouteObject } from "@/interface";

const drawingRouters: CustomRouteObject[] = [
  {
    path: "drawing-board",
    element: <Sw E={lazy(() => import("@/views/drawing"))} />,
    position: 2,
    name: "画板",
    icon: "MdOutlineFormatShapes",
  },
];

export default drawingRouters;
