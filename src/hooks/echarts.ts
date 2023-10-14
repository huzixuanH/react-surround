/* eslint-disable no-redeclare */
// 引入 echarts 核心模块，提供 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图、折线图，图表后缀都为 Chart
import { BarChart, LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent, // 数据集组件
  TransformComponent, // 内置数据转换器组件 (filter, sort)
} from "echarts/components";
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { ECOption } from "@/interface";

// 注册组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

type EChartsInitOpts = Parameters<typeof echarts.init>[2];

function useEcharts<T extends HTMLElement>(
  option: ECOption,
  theme: string | object | null
): React.MutableRefObject<T>[];
function useEcharts<T extends HTMLElement>(
  option: ECOption,
  opts: EChartsInitOpts
): React.MutableRefObject<T>[];
function useEcharts<T extends HTMLElement>(
  option: ECOption,
  theme?: string | object | null,
  opts?: EChartsInitOpts
): React.MutableRefObject<T>[];

function useEcharts<T extends HTMLElement>(
  option: ECOption,
  theme?: string | object | null,
  opts?: EChartsInitOpts
) {
  const ref = useRef<T>();

  useEffect(() => {
    if (!ref.current) return;
    const charts = echarts.init(ref.current, theme, opts);
    charts.setOption(option);

    return () => {
      charts?.dispose();
    };
  }, [option, theme, opts]);

  return [ref];
}

export default useEcharts;
