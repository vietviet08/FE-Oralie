import React from "react";
import Menu from "./menu";
import Slider from "./slider";
import { MenuIcon } from "lucide-react";
import dataSlider from "@/constants/slider-data.json";

const SoloGan = () => {
  return (
    <div className="flex">
      <div className="w-2/5 mr-1 rounded-lg shadow-lg hidden sm:block">
        <Menu />
      </div>
      <div className="w-full ml-1 rounded-lg sm:w-3/5 shadow-lg">
        <Slider data={dataSlider} />
      </div>
    </div>
  );
};

export default SoloGan;
