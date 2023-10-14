import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";
import { ReactNode } from "react";
import { ComposeOption } from "echarts/core";
import { BarSeriesOption, LineSeriesOption } from "echarts/charts";
import {
  DatasetComponentOption,
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts/components";

export type CustomRouteObject = (
  | IndexRouteObject
  | (Omit<NonIndexRouteObject, "children"> & { children?: CustomRouteObject[] })
) & { icon?: ReactNode; position?: ReactNode; name?: ReactNode };

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;
