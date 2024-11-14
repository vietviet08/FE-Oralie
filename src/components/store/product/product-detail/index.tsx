"use client";

import { Badge } from "@/components/ui/badge";
import { Product } from "@/model/product/Product";
import React, { useEffect, useRef, useState } from "react";
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
import { Swiper as SwiperType } from "swiper/types";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
type Props = {
  product: Product;
};

const ProductPageDetail = ({ product }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.navigation) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [swiperRef.current]);

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
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  style={
                    {
                      "--swiper-navigation-color": "#DA2118",
                      "--swiper-pagination-color": "#DA2118",
                      "--swiper-navigation-size": "32px",
                    } as React.CSSProperties
                  }
                  spaceBetween={10}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
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
                          className="absolute left-0 top-0 w-full h-full object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  <div
                    ref={prevRef}
                    style={{
                      opacity: 0.3,
                      position: "absolute",
                      top: "50%",
                      left: "0",
                      zIndex: 10,
                      paddingLeft: "20px",
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#DA2118",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "ease-in-out 0.2s",
                      transform: "translateY(-50%) translateX(-50%)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.7")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "0.3")
                    }
                  >
                    &#10094;
                  </div>
                  <div
                    ref={nextRef}
                    style={{
                      opacity: 0.3,
                      position: "absolute",
                      top: "50%",
                      right: "0px",
                      zIndex: 10,
                      paddingLeft: "10px",
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#DA2118",
                      color: "#fff",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      cursor: "pointer",
                      transition: "ease-in-out 0.2s",
                      transform: "translateY(-50%) translateX(50%)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.8")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "0.3")
                    }
                  >
                    &#10095;
                  </div>
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
              <div className="flex justify-around space-x-2 mb-4">
                <div className="flex flex-col justify-center items-center w-1/3  rounded-xl border border-primaryred2 overflow-hidden">
                  <div className="text-primaryred1 font-bold text-sm">
                    16GB - 512GB
                  </div>
                  <div className="text-primaryred1 text-sm">$1111</div>
                </div>
                <div className="flex flex-col justify-center items-center w-1/3  rounded-xl border border-gray-300 overflow-hidden">
                  <div className="text-primaryred1">16GB - 512GB</div>
                  <div className="text-primaryred1">$1111</div>
                </div>
                <div className="flex flex-col justify-center items-center w-1/3  rounded-xl border border-gray-300 overflow-hidden">
                  <div className="text-primaryred1">16GB - 512GB</div>
                  <div className="text-primaryred1">$1111</div>
                </div>
              </div>

              <div className="flex justify-between items-center space-x-3 my-4">
                <div className="rounded-lg bg-primaryred w-5/6 h-14 flex flex-col justify-center items-center">
                  <span className="text-sm text-white space-y-1 flex flex-col justify-center items-center">
                    <span className="font-bold uppercase">Pay now</span>
                    <span>Shiping or take direct in the store</span>
                  </span>
                </div>
                <div className="h-14 flex items-center">
                  <Button className="flex flex-col justify-center items-center rounded-lg border text-primaryred border-primaryred bg-white w-20 h-14 transition-all duration-300 ease-in-out hover:bg-primaryred hover:text-white">
                    <Icons.shoppingCart className="w-10 h-10 text-xl" />
                    <span className=" text-[12px]">Add to cart</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div>
                  <h2 className="text-2xl font-bold text-primaryred">
                    {product.name}
                  </h2>
                </div>
                <div>
                  <p className="text-lg font-semibold text-primaryred">
                    ${product.price}
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
