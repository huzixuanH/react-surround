import { CustomRouteObject } from "@/interface";
import { Sw } from "@/components/suspense";
import { lazy } from "react";

const uploadRouters: CustomRouteObject[] = [
  {
    path: "upload",
    element: <Sw E={lazy(() => import("@/views/upload"))} />,
    position: 5,
    name: "文件上传",
    icon: "MdUploadFile",
  },
];

export default uploadRouters;
