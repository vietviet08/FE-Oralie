import React from "react";

import bannerData from "@/constants/banner-data.json";

import {SliderProps} from "@/constants/slider_type";
import Image from "next/image";

const Banner: React.FC<SliderProps> = () => {
    return (
        <div className="relative w-full h-auto flex flex-col space-y-2 justify-center ">
            {bannerData.map(({id, image, title}) => (
                <div
                    key={id}
                    className="relative w-full h-[115px] rounded-lg shadow-lg overflow-hidden"
                >
                    <Image
                        src={image}
                        alt={title}
                        sizes="100%"
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
