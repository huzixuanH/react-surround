import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout";
import tableRouters from "@/router/model/table";
import homeRouters from "@/router/model/home";
import Login from "@/views/login";
import { lazy } from "react";
import { Sw } from "@/components/suspense";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...homeRouters,
      ...tableRouters,
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
