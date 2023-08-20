import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout";
import tableRouters from "@/router/model/table";
import homeRouters from "@/router/model/home";
import drawingRouters from "@/router/model/drawing";
import Login from "@/views/login";
import { lazy } from "react";
import { Sw } from "@/components/suspense";
import echartsRouters from "./model/echarts";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...homeRouters,
      ...drawingRouters,
      ...echartsRouters,
      ...tableRouters,
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
]);

export default rootRouter;
