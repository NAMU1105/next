import React from "react";
import * as chartjs from "react-chartjs-2";

const Charts = (props) => {
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
