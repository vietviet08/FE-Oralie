import React from "react";
import Menu from "./menu";
import Slider from "./slider";
import { MenuIcon } from "lucide-react";
import dataSlider from "@/constants/slider-data.json";
import dataBanner from "@/constants/banner-data.json";
import Banner from "./banner";

const SoloGan = () => {
  return (
    <div className="flex">
      <div className="w-2/6 mr-2 rounded-lg shadow-lg hidden sm:block">
        <Menu />
      </div>
      <div className="w-full mr-2 rounded-lg sm:w-3/6 shadow-lg">
        <Slider data={dataSlider} />
      </div>
      <div className="w-1/6 mr-2 hidden sm:block">
        <Banner data={dataBanner} />
      </div>
    </div>
  );
};

export default SoloGan;
