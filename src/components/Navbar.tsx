import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const currentLocation: string = window.location.pathname;
  return (
    <div className="flex justify-evenly md:hidden w-screen px-3 py-1 bg-blue-50 fixed top-0">
      <div
        className="flex items-center px-5 py-2 rounded-lg my-2 text-base font-semibold bg-white cursor-pointer"
        onClick={() => navigate("/")}
        style={{
          backgroundColor:
            currentLocation === "/toolyt-assignment" ? "#85f8f6" : "white",
        }}
      >
        Contact
      </div>
      <div
        className="flex items-center px-5 py-2 rounded-lg my-2 text-base font-semibold bg-white cursor-pointer"
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

export default Navbar;
