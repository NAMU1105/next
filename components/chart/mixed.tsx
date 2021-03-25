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
          //   labels: [...DUMMY_CHART_DATA.labels],

          datasets: [
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

                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                ],
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
      />
    </div>
  );
};
