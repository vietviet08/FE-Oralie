"use client";

import "@/styles/custompaginationswiper.css";
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ListResponse } from "@/model/ListData";
import { Product } from "@/model/product/Product";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../../product/product-card";
import { getProductById } from "@/services/ProductService";
import { Button } from "@/components/ui/button";
import { Swiper as SwiperType } from "swiper/types";

const ProductSlider: React.FC<ListResponse<Product>> = ({ data }) => {
  const [product, setProduct] = useState<Product>();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    async function fetchData() {
      const response = await getProductById(12);
      setProduct(response);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.navigation) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [swiperRef.current]);

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <span>
          <h2 className="text-2xl font-semibold text-primaryred">
            Sản phẩm nổi bật
          </h2>
        </span>

        <div className="flex items-center justify-center space-x-2">
          <Button variant="destructive" className={"rounded-xl"}>
            Category
          </Button>
          <Button variant="destructive" className={"rounded-xl"}>
            Category
          </Button>
          <Button variant="destructive" className={"rounded-xl"}>
            Category
          </Button>
        </div>
      </div>

      <section className="w-full h-[395px] rounded-lg overflow-hidden">
        <div className="">
          <ul className="h-[395px] w-full">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={5}
              autoplay={true}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              style={
                {
                  "--swiper-navigation-color": "#DA2118",
                  "--swiper-pagination-color": "#DA2118",
                  "--swiper-navigation-size": "32px",
                } as React.CSSProperties
              }
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                500: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                740: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
                1340: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
              className="mySwiper h-full"
            >
              {product && (
                <>
                  <SwiperSlide>
                    <div className="w-full">
                      <ProductCard product={product} />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductCard product={product} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductCard product={product} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductCard product={product} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductCard product={product} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <ProductCard product={product} />
                  </SwiperSlide>
                </>
              )}
              <div
                ref={prevRef}
                style={{
                  opacity: 0.5,
                  position: "absolute",
                  top: "50%",
                  left: "10px",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DA2118",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "ease-in-out 0.2s",
                  transform: "translateY(-50%)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                &#10094;
              </div>
              <div
                ref={nextRef}
                style={{
                  opacity: 0.5,
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  zIndex: 10,
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DA2118",
                  color: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "ease-in-out 0.2s",
                  transform: "translateY(-50%)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
              >
                &#10095;
              </div>
            </Swiper>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductSlider;
