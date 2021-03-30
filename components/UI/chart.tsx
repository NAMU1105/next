import React from "react";
import * as chartjs from "react-chartjs-2";

type ChartLegend = {
  labels?: {
    fontSize?: number;
    fontColor?: string;
  };
  position?: "bottom" | "top" | "left" | "right";
  fullWidth?: boolean;
  reverse?: boolean;
  display?: boolean;
};

type ChartTooltip = {
  enabled?: boolean;
};

type ScaleXesType = {
  stacked?: boolean;
};

type ChartOption = {
  responsive?: boolean;
  responsiveAnimationDuration?: number;
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  onResize?: () => void;
  legend?: ChartLegend;
  tooltips?: ChartTooltip;
  scales?: {
    xAxes?: Array<ScaleXesType>;
    yAxes?: Array<ScaleXesType>;
  };
};

type BubbleDataType = {
  x: number;
  y: number;
  r: number;
};

type Datasets = {
  label?: string;
  // type?: "line" | "bar" | "bubble" | "pie";
  type?: string;
  data: Array<number> | Array<BubbleDataType>;
  fill?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderJoinStyle?: string;
  borderCapStyle?: string;
  borderDash?: Array<null | number>;
  borderDashOffset?: number;
  pointBorderColor?: string;
  pointBorderWidth?: number;
  pointHoverRadius?: number;
  pointBackgroundColor?: string;
  pointHoverBorderColor?: string;
  pointHoverBackgroundColor?: string;
  pointHoverBorderWidth?: number;
  pointRadius?: number;
  pointHitRadius?: number;
  yAxisID?: string;
};

type ChartData = {
  // chartType: "line" | "bar" | "horizontalBar" | "bubble" | "pie" | "doughnut";
  // chartType: string;
  labels?: Array<number | string>;
  datasets: Array<Datasets>;
};

interface ChartProps {
  chartType:
    | "line"
    | "bar"
    | "horizontalBar"
    | "bubble"
    | "pie"
    | "doughnut"
    | "mixed";
  data: ChartData;
  height?: number;
  width?: number;
  options?: ChartOption;
}
const Charts: React.FC<ChartProps> = (props: ChartProps) => {
  // console.log(props);
  // console.log(props.data);

  switch (props.chartType) {
    case "bar":
      return (
        <chartjs.Bar
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Bar>
      );
    case "line":
      return (
        <chartjs.Line
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Line>
      );
    case "horizontalBar":
      return (
        <chartjs.HorizontalBar
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.HorizontalBar>
      );
    case "bubble":
      return (
        <chartjs.Bubble
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Bubble>
      );
    case "pie":
      return (
        <chartjs.Pie
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Pie>
      );
    case "doughnut":
      return (
        <chartjs.Doughnut
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Doughnut>
      );

    default:
      return (
        <chartjs.Bar
          data={props.data}
          options={props.options}
          width={props.width}
          height={props.height}
        ></chartjs.Bar>
      );
  }
};
export default Charts;
