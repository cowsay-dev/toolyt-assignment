import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const currentLocation: string = window.location.pathname;
  return (
    <div className="hidden md:flex flex-col w-fit rounded-lg p-3 m-3 h-3/4 bg-blue-50 fixed">
      <div
        className="px-5 py-2 rounded-lg my-2 text-base font-semibold bg-white cursor-pointer"
        onClick={() => navigate("/")}
        style={{
          backgroundColor:
            currentLocation === "/toolyt-assignment" ? "#85f8f6" : "white",
        }}
      >
        Contact
      </div>
      <div
        className="px-5 py-2 rounded-lg my-2 text-base font-semibold bg-white cursor-pointer"
        onClick={() => navigate("/chart")}
        style={{
          backgroundColor:
            currentLocation === "/toolyt-assignment/chart"
              ? "#85f8f6"
              : "white",
        }}
      >
        Charts and Maps
      </div>
    </div>
  );
};

export default Sidebar;
