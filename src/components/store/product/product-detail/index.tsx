"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/model/product/Product";
import React, { useState } from "react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../product-card";
import ProductSlider from "../../home/productSlider";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper as SwiperClass } from "swiper/types";

type Props = {
  product: Product;
};

const ProductPageDetail = ({ product }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="sm:px-32 px-6 py-6 ">
      <div className="flex justify-between items-center w-5/6 py-4">
        <div>
          <h2 className="text-2xl font-bold text-primaryred">{product.name}</h2>
        </div>
        <div className="-space-x-8">
          {product.isAvailable ? (
            <Badge
              variant={"allower"}
              className="w-32 h-8 text-center flex justify-center items-center rounded-2xl border-allowertext"
            >
              <span>Status: Stock</span>
            </Badge>
          ) : (
            <Badge
              variant={"destructive"}
              className="w-32 h-8  text-center flex justify-center items-center rounded-2xl border-allowertext"
            >
              <span>Status: Out of stock</span>
            </Badge>
          )}
        </div>
      </div>
      <div className="py-2 border-b-[1px] border-b-primaryred2"></div>
      <div className="pt-8">
        <main>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-3/5 mr-0 md:mr-2 mt-0 p-4 rounded-lg shadow-md">
              <div className="relative w-full h-full rounded-lg  overflow-hidden">
                <Swiper
                  style={
                    {
                      "--swiper-navigation-color": "#DA2118",
                      "--swiper-pagination-color": "#DA2118",
                      "--swiper-navigation-size": "32px",
                    } as React.CSSProperties
                  }
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  // pagination={{ type: "bullets", clickable: true }}
                  autoplay={true}
                  loop={true}
                  modules={[Autoplay, Navigation, Thumbs]}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-[360px]">
                        <img
                          src={image.url}
                          alt={product.name}
                          className="absolute left-0 top-0 w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={8}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-6 px-4"
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className="rounded-md py-4 border-gray-400 overflow-hidden"
                    >
                      <div
                        className="relative w-20 h-[84px] rounded-xl border border-gray-300 overflow-hidden"
                        style={{
                          border:
                            index === activeIndex
                              ? "1px solid #DA2118"
                              : "1px solid #d1d5db ",
                        }}
                      >
                        <img
                          src={image.url}
                          alt={product.name}
                          className="absolute left-0 top-0 w-20 h-20 object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
            <div className="w-full md:w-2/5 ml-0 md:ml-2 mt-0 p-4 rounded-lg shadow-md">
              <div className="flex flex-col space-y-2">
                <div>
                  <h2 className="text-2xl font-bold text-primaryred">
                    {product.name}
                  </h2>
                </div>
                <div>
                  <p className="text-lg font-semibold text-primaryred">
                    {product.price} VND
                  </p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-primaryred">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="py-6 mb-6 border-b-[1px] border-b-primaryred2"></div>
      <div className="my-2">
        <ProductSlider
          data={[]}
          pageNo={0}
          pageSize={0}
          totalElements={0}
          totalPages={0}
          isLast={false}
        ></ProductSlider>
      </div>
    </div>
  );
};

export default ProductPageDetail;
