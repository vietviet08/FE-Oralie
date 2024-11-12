import React from "react";

import bannerData from "@/constants/banner-data.json";

import { Slide, ButtonProps, SliderProps } from "@/constants/slider_type";
import Image from "next/image";

const Banner: React.FC<SliderProps> = ({ data }) => {
  return (
    <div className="relative w-full h-auto flex flex-col space-y-2 justify-center ">
      {bannerData.map(({ id, image, tagline, title, buttons }) => (
        <div
          key={id}
          className="relative w-full h-[95px] rounded-lg shadow-lg overflow-hidden"
        >
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="absolute left-0 top-0"
          />
          {/* <div className="relative z-10">
            {buttons.map(({ id, link, text }) => (
              <a href={link} key={id} className="text-white p-2 bg-black">
            <span>{text}</span>
              </a>
            ))} 
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Banner;
