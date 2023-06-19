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
        element: <VirtualTable id="123" />,
        children: [
          // { index: true, element:  },
          { path: ":id", element: <VirtualTable id="456" /> },
        ],
      },
    ],
  },
];

export default tableRouters;
