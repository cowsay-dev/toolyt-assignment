import React from "react";
import { useFetchCasesData } from "../hooks/useFetchCasesData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Total cases",
    },
  },
};

const LineChart = () => {
  const { data: allData } = useFetchCasesData();
  const labels = allData?.cases.dates;
  const data = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: allData?.cases.values,
        borderColor: "rgb(51, 152, 255)",
        backgroundColor: "rgba(51, 152, 255, 0.5)",
      },
      {
        label: "Deaths",
        data: allData?.deaths.values,
        borderColor: "rgb( 255, 105, 51 )",
        backgroundColor: "rgba( 255, 105, 51 , 0.5)",
      },
      {
        label: "Recovered",
        data: allData?.recovered.values,
        borderColor: "rgb( 136, 51, 255 )",
        backgroundColor: "rgba( 136, 51, 255 , 0.5)",
      },
    ],
  };
  return (
    <div className="flex justify-center w-full">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
