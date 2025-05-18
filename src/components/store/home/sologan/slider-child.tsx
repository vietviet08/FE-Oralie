"use client";

import React from "react";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
    slide: Slide[];
}

interface NewSliderProps {
    data: SliderProps[];
}

const SliderChild: React.FC<NewSliderProps> = ({data}) => {

    return (
        <div className="w-full">
            <div className="flex justify-between items-center gap-2">
                {data.map((item, index) => (
                    <div key={index} className="w-3/12 rounded-lg overflow-hidden">
                        <Swiper
                            pagination={{type: "bullets", clickable: true}}
                            autoplay={true}
                            loop={true}
                            modules={[Autoplay, Pagination]}
                        >
                            {item.slide.map(({id, image, tagline, title}) => (
                                <SwiperSlide key={id}>
                                    <div className="relative w-full h-[220px]">
                                        <Image
                                            src={image}
                                            alt={title}
                                            sizes="100%"
                                            layout="fill"
                                            objectFit="cover"
                                            className="absolute left-0 top-0"
                                        />
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
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SliderChild;