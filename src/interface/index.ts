import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import React from "react";

export type CustomRouteObject = (
  | IndexRouteObject
  | (Omit<NonIndexRouteObject, "children"> & {
      children?: CustomRouteObject[];
    })
) & { icon?: React.ReactNode };
