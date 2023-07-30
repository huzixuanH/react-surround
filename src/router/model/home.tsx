import Home from "@/views/home";
import { CustomRouteObject } from "@/interface";

const homeRouters: CustomRouteObject[] = [
  {
    path: "home",
    element: <Home />,
  },
];

export default homeRouters;
