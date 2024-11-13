"use client";
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
    <section className="w-full rounded-lg  overflow-hidden">
      <div className="">
        <ul className="h-full w-full">
          <Swiper
            slidesPerView={5}
            autoplay={true}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper"
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
  );
};

export default ProductSlider;
