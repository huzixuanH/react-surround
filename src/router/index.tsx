import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "@/components/layout";
import tableRouters from "@/router/model/table";
import homeRouters from "@/router/model/home";
import Login from "@/views/login";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="home" /> },
      ...homeRouters,
      ...tableRouters,
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default rootRouter;
