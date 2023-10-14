import Home from "@/views/home";
import { CustomRouteObject } from "@/interface";

const homeRouters: CustomRouteObject[] = [
  {
    path: "home",
    element: <Home />,
    position: 1,
    name: "首页",
    icon: "HomeOutlined",
  },
];

export default homeRouters;
