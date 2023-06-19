import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout";
import tableRouters from "@/router/model/table";
import Home from "@/views/home";
import homeRouters from "@/router/model/home";
import Login from "@/views/login";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      ...homeRouters,
      ...tableRouters,
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

console.log("rootRouter", rootRouter.state);

export default rootRouter;
