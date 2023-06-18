import { RouteObject } from "react-router-dom";
import BasicTable from "@/views/table/basic";
import VirtualTable from "@/views/table/virtual";

const tableRouters: RouteObject[] = [
  {
    path: "table",
    children: [
      {
        path: "basic",
        element: <BasicTable />,
      },
      {
        path: "virtual",
        element: <VirtualTable />,
      },
    ],
  },
];

export default tableRouters;
