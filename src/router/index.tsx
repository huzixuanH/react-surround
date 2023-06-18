import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout";
import tableRouters from "@/router/model/table";
import BasicTable from "@/views/table/basic";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <BasicTable /> }, ...tableRouters],
  },
]);

export default rootRouter;
