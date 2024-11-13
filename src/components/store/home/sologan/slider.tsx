"use client";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SliderButtons from "@/components/common/SliderButton";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface SliderProps {
  data: Slide[];
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  return (
    <section className="w-full rounded-lg  overflow-hidden">
      <div className="">
        <ul className="h-full w-full">
          <Swiper
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Pagination]}
          >
            {data.map(({ id, image, tagline, title, buttons }) => (
              <SwiperSlide key={id}>
                <div className="relative w-full h-[300px]">
                  <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="absolute left-0 top-0"
                  />
                  {/* <div className="absolute left-0 top-0 h-full w-full bg-black opacity-20"></div> */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center">
                      {tagline && (
                        <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white">
                          {tagline}
                        </p>
                      )}
                      <p className="text-3xl sm:text-6xl lg:text-8xl font-bold text-white">
                        {title}
                      </p>
                      {/* {buttons.length > 0 ? (
                        <p className="bg-gray-800 inline-block px-9 py-2 rounded-full text-white mt-10 lg:mt-20">
                          <SliderButtons buttons={buttons} />
                        </p>
                      ) : null} */}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default Slider;
