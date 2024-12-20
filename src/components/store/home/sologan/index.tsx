import React from "react";
import Menu from "./menu";
import Slider from "./slider";
import dataSlider from "@/constants/slider-data.json";
import dataBanner from "@/constants/banner-data.json";
import dataChildSlider from "@/constants/banner-child-data.json";
import Banner from "./banner";
import SliderChild from "@/components/store/home/sologan/slider-child";
import Image from "next/image";
import Link from "next/link";
import {TreePine} from "lucide-react";

const SoloGan = () => {
    const transformData = dataChildSlider.map((item) => ({slide: item}));

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center gap-2">
                <div className="w-2/12  shadow-lg hidden lg:block">
                    <Menu/>
                </div>
                <div className="w-7/12  rounded-lg lg:w-3/5 shadow-lg">
                    <Slider data={dataSlider}/>
                </div>
                <div className="w-3/12 hidden lg:block">
                    <Banner data={dataBanner}/>
                </div>
            </div>
            {/*<div className="w-full rounded-lg overflow-hidden">*/}
            {/*    <Image*/}
            {/*        src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Christmas-Cutoff-Dates_1400x200_2.jpg"}*/}
            {/*        alt={""} width={620} height={620} className={"w-full h-48 object-cover rounded-lg"}/>*/}
            {/*</div>*/}
            <div className="w-full bg-primaryred h-14 rounded-lg font-base text-white">
                <div className="container flex justify-center items-center h-full gap-2">
                    <TreePine className="text-white" size={20}/>
                    <span className="text-white text-xl font-bold"> Our Stores Open This Christmas Season</span>
                    <Link href={"/"}>Click For Trading Hours</Link>
                    <TreePine className="text-white" size={20}/>
                </div>
            </div>
            <div>
                <SliderChild data={transformData}/>
            </div>
        </div>
    );
};

export default SoloGan;
