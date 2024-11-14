"use client";

import "@/styles/custompaginationswiper.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ListResponse } from "@/model/ListData";
import { Product } from "@/model/product/Product";
import React, { useEffect, useState } from "react";
import ProductCard from "../../product/product-card";
import { getProductById } from "@/services/ProductService";
import { Button } from "@/components/ui/button";

const ProductSlider: React.FC<ListResponse<Product>> = ({ data }) => {
  useState<Product[]>(data);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function fetchData() {
      const response = await getProductById(12);
      // const data = response.data;
      setProduct(response);
    }

    fetchData();
  }, []);

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

      <section className="w-full h-[395px] rounded-lg  overflow-hidden">
        <div className="">
          <ul className="h-[395px] w-full">
            <Swiper
              slidesPerView={5}
              autoplay={true}
              spaceBetween={30}
              freeMode={true}
              pagination={{
                clickable: true,
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
              modules={[FreeMode, Pagination, Autoplay]}
              className="mySwiper h-full"
            >
              {product && (
                <>
                  <SwiperSlide>
                    <div className="w-full ">
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
            </Swiper>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProductSlider;
