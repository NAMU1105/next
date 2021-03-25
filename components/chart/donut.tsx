import React from "react";
import { Doughnut } from "react-chartjs-2";

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

export const DonutChart: React.FC<ChartProps> = (props: ChartProps) => {
  // const { width, responsiveWidth, height, responsiveHight } = props;

  return (
    <div>
      <Doughnut
        //   id="pieChart"
        data={{
          labels: [...DUMMY_CHART_DATA.labels],
          datasets: [
            {
              label: "Food",
              data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
              //   #d24444 형태의 컬러값도 가능
              backgroundColor: ["orange", "red", "blue"],
              borderColor: "light-gray",
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
