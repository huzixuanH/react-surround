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

  const [echartsRef] = useEcharts<HTMLDivElement>(option, {
    width: 200,
    height: 200,
  });

  return (
    <div className="content">
      <div ref={echartsRef} style={{ width: 400, height: 400 }} />
    </div>
  );
}

export default Echarts;
