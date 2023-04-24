import React from "react";
import LineChart from "../components/LineChart";
import Map from "../components/Map";

const Chart = () => {
  return (
    <div className="flex flex-col p-3 mt-20 md:ml-56 md:mt-0 h-full">
      <LineChart />
      <h1 className="pt-3">Cases world-wide</h1>
      <Map />
    </div>
  );
};

export default Chart;
