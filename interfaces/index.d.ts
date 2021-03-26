// * WithChildren 인터페이스는 컴포넌트가 받을 수 있는 자식 요소에 대한 정보를 정의합니다.
interface WithChildren {
  //* 자식 요소는 있을 수도 있고 없을 수도 있으며 -> ?:
  //* ReactNode 타입 or FunctionComponent 타입 or ReactChildren 타입으로 정의됩니다.
  //* 참고로 ReactNode 타입은 ( ReactChild | ReactFragment |
  // * ReactPortal | boolean | null | undefined ) 로 정의되어 있습니다.
  children?: React.ReactNode | React.FC | ReactChildren;
}

// TODO: chart 는 따로 파일 만들기
// interface ChartProps {
//   id?: string;
//   labels: Array<string>;
//   data: Array<number>;
//   fill?: boolean;
//   height?: number;
//   width?: number;
//   responsiveWidth?: number;
//   borderColor?: string;
//   backgroundColor?: string;
//   maintainAspectRatio?: boolean;

//   legendLabel?: {
//     fontSize: number;
//     fontColor: string;
//   };
//   legendPosition?: "bottom" | "top" | "left" | "right";
//   legentFullWidth?: boolean;
//   legentReverse?: boolean;

//   legentDisplay?: boolean;
//   tooltipEnabled?: boolean;

//   pointBorderColor?: string;
//   pointBackgroundColor?: string;
//   pointHoverBackgroundColor?: string;
//   pointHoverBorderColor?: string;
//   xAxesStacked?: boolean;
//   yAxesStacked?: boolean;
// }

// interface LineChartProps extends ChartProps {
//   pointBorderColor?: string;
//   pointBackgroundColor?: string;
//   pointHoverBackgroundColor?: string;
//   pointHoverBorderColor?: string;
//   xAxesStacked?: boolean;
//   yAxesStacked?: boolean;
// }

interface MixedProps extends ChartProps {
  yAxisID?: string;
  type: "line" | "bar" | "bubble";
  // secondData: Array<number>;
  //   secondBorderColor?: string;
  //   secondBackgroundColor?: string;
  //   secondoHoverBackgroundColor?: string;
  //   secondoHoverBorderColor?: string;
  //   secondFill?: boolean;
}

///////////////////////////////////////
//***********************************//
///////////////////////////////////////

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
