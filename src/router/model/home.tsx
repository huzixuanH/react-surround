import { RouteObject } from "react-router-dom";
import Home from "@/views/home";

const homeRouters: RouteObject[] = [
  {
    path: "home",
    element: <Home />,
  },
];

export default homeRouters;
