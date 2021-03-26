import React from "react";
import { Bubble } from "react-chartjs-2";

// defaults.global.tooltips.enabled = false;
// defaults.global.legend.position = "bottom";
// defaults.global.legend.display = false;

export const BubbleChart: React.FC<ChartProps> = (props: ChartProps) => {
  // const { width, responsiveWidth, height, responsiveHight } = props;

  return (
    <div>
      <Bubble
        //   id="pieChart"
        data={{
          labels: ["January"],

          datasets: [
            {
              label: "My First dataset",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#ff0000",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [{ x: 10, y: 20, r: 5 }],
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
