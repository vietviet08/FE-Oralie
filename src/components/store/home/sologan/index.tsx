import React from "react";
import Menu from "./menu";
import Slider from "./slider";
import dataSlider from "@/constants/slider-data.json";
import dataBanner from "@/constants/banner-data.json";
import Banner from "./banner";

const SoloGan = () => {
  return (
    <div className="flex">
      <div className="w-1/5 mr-2 rounded-lg shadow-lg hidden lg:block">
        <Menu />
      </div>
      <div className="w-full mr-2 rounded-lg lg:w-3/5 shadow-lg">
        <Slider data={dataSlider} />
      </div>
      <div className="w-1/5 mr-2 hidden lg:block">
        <Banner data={dataBanner} />
      </div>
    </div>
  );
};

export default SoloGan;
