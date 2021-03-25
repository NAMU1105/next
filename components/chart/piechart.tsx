import React from "react";
import { Bar, HorizontalBar, Pie, defaults } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";
// defaults.global.legend.display = false;

const DUMMY_CHART_DATA = {
  labels: ["Jan", "Feb", "Mar"],
};

export const PieChart: React.FC<ChartProps> = (props: ChartProps) => {
  // const { width, responsiveWidth, height, responsiveHight } = props;

  return (
    <div>
      <Pie
        //   id="pieChart"
        data={{
          labels: [...DUMMY_CHART_DATA.labels],
          datasets: [
            {
              data: [12, 19, 3],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              //   hoverBackgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
              // borderColor: "light-gray",
              // borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          //   scales: {
          //     xAxes: [
          //       {
          //         stacked: true,
          //       },
          //     ],
          //     yAxes: [
          //       {
          //         stacked: true,
          //       },
          //     ],
          //   },
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        }}
      />
    </div>
  );
};
