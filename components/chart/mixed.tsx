//http://plnkr.co/edit/TvY5tz?p=preview&preview
import React from "react";
import { Bar } from "react-chartjs-2";

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

export const MixedChart: React.FC<ChartProps> = (props: ChartProps) => {
  return (
    <div>
      <Bar
        data={{
          datasets: [
            // Linear data
            {
              label: "Sales",
              type: "line",
              data: [51, 65, 40, 49, 60, 37, 40, 51, 65, 40, 49],
              fill: false,
              borderColor: "#EC932F",
              backgroundColor: "#EC932F",
              pointBorderColor: "#EC932F",
              pointBackgroundColor: "#EC932F",
              pointHoverBackgroundColor: "#EC932F",
              pointHoverBorderColor: "#EC932F",
              yAxisID: "y-axis-2",
            },
            // Bubble data
            {
              type: "bubble",
              label: "bubble",
              fill: true,
              lineTension: 0.1,
              backgroundColor: "#cc6060",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "#020c0c",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#8c1ca8",
              pointHoverBorderColor: "#291212",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [
                { x: 10, y: 20, r: 5 },
                { x: 100, y: 200, r: 5 },
                { x: 400, y: 250, r: 5 },
                { x: 700, y: 570, r: 20 },
              ],
            },
            // Bar data
            {
              type: "bar",
              label: "Visitor",
              data: [200, 185, 590, 621, 250, 400, 95, 185, 590, 621, 250, 100],
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

                labels: [...DUMMY_CHART_DATA.labels],
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
            position: "left",
            // display: false,
          },
          tooltips: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};
