import useEcharts from "@/hooks/echarts";
import { ECOption } from "@/interface";

function Echarts() {
  const option: ECOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
      },
    ],
  };

  const [echartsRef] = useEcharts<HTMLDivElement>(option);

  return (
    <>
      <div
        ref={echartsRef}
        style={{ width: 300, height: 300 }}
        className="content"
      />
      <div
        ref={echartsRef}
        style={{ width: 300, height: 300 }}
        className="content"
      />
    </>
  );
}

export default Echarts;
