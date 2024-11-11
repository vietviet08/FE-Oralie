import React from "react";
import Menu from "./menu";
import Slider from "./slider";
import { MenuIcon } from "lucide-react";

const SoloGan = () => {
  return (
    <div className="flex">
      <div className="w-2/5 mr-1 rounded-lg shadow-lg hidden sm:block">
        <Menu />
      </div>
      <div className="w-full ml-1 rounded-lg sm:w-3/5 shadow-lg">
        <Slider />
      </div>
    </div>
  );
};

export default SoloGan;
