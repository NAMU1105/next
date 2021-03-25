import React from "react";
import { Bar, HorizontalBar, Pie, defaults } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";
// defaults.global.legend.display = false;

const DUMMY_CHART_DATA = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export const BarChart: React.FC<ChartProps> = (props: ChartProps) => {
  // const { vertical, width, responsiveWidth, height, responsiveHight } = props;

  return (
    <div>
      {/* <h3 className="my-3">New users/sales</h3> */}
      <Bar
        data={{
          labels: [...DUMMY_CHART_DATA.labels],
          datasets: [
            {
              label: "Food",
              data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
              //   #d24444 형태의 컬러값도 가능
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Beverage",
              data: [47, 52, 67, 58, 9, 50, 58, 9, 50, 58, 9, 50],
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 1,
            },
            {
              label: "Desserts",
              data: [47, 52, 67, 58, 9, 50, 58, 9, 50, 58, 9, 50],
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
              },
            ],
            yAxes: [
              {
                stacked: true,
              },
            ],
          },
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
export const HorizontalBarChart: React.FC<ChartProps> = (props: ChartProps) => {
  // const { vertical, width, responsiveWidth, height, responsiveHight } = props;

  return (
    <div>
      <HorizontalBar
        data={{
          datasets: [
            {
              label: "Sales",
              type: "line",
              data: [51, 65, 40, 49, 60, 37, 40],
              fill: false,
              borderColor: "#EC932F",
              backgroundColor: "#EC932F",
              pointBorderColor: "#EC932F",
              pointBackgroundColor: "#EC932F",
              pointHoverBackgroundColor: "#EC932F",
              pointHoverBorderColor: "#EC932F",
              yAxisID: "y-axis-2",
            },
            {
              type: "bar",
              label: "Visitor",
              data: [200, 185, 590, 621, 250, 400, 95],
              fill: false,
              backgroundColor: "#71B37C",
              borderColor: "#71B37C",
              hoverBackgroundColor: "#71B37C",
              hoverBorderColor: "#71B37C",
              yAxisID: "y-axis-1",
            },
          ],
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: false,
                },
                labels: {
                  show: true,
                },
              },
            ],
            yAxes: [
              {
                type: "linear",
                display: true,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false,
                },
                labels: {
                  show: true,
                },
              },
              {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  display: false,
                },
                labels: {
                  show: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 16,
            },
          },
        }}
        // plugins={[
        //   {
        //     afterDraw: (chartInstance, easing) => {
        //       const ctx = chartInstance.chart.ctx;
        //       ctx.fillText("This text drawn by a plugin", 100, 100);
        //     },
        //   },
        // ]}
      />
    </div>
  );
};
