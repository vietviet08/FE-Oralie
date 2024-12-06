"use client";

import {Badge} from "@/components/ui/badge";
import {Product} from "@/model/product/Product";
import React, {useEffect, useRef, useState} from "react";
import {Autoplay, FreeMode, Navigation, Thumbs} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import ProductSlider from "../../home/productSlider";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {Swiper as SwiperClass} from "swiper/types";
import {Swiper as SwiperType} from "swiper/types";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {getTop10ProductRelatedCategory} from "@/services/ProductService";
import Rates from "@/components/store/product/rates";

type Props = {
    product: Product;
};

const ProductPageDetail = ({product}: Props) => {
    const [productsRelated, setProductsRelated] = useState<Product[]>([]);

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

    useEffect(() => {
        async function fetchTop10ProductRelated() {
            if (product.id && product.productCategories?.[0]?.category?.name) {
                const response = await getTop10ProductRelatedCategory(product.id, product.productCategories[0].category.name);
                setProductsRelated(response);
            }
        }

        fetchTop10ProductRelated().then(r => r);
    }, [product.id, product.productCategories]);

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <div className="flex justify-between items-center w-full py-4">
                <div className="w-3/5">
                    <h2 className="text-2xl font-bold text-primaryred">{product.name}</h2>
                </div>
                <div className="">
                    {product.isAvailable ? (
                        <Badge
                            variant={"allower"}
                            className="w-36 h-10 text-center flex justify-center items-center rounded-2xl border-allowertext"
                        >
                            <span className="text-[15px]">Status: Stock</span>
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
                    <div className="flex flex-col md:flex-row md:justify-center ">
                        <div className="w-full md:w-3/5 mr-0 md:mr-2 mt-0 m-4 ml-0 ">
                            <div className="relative w-full h-full ">
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
                                    thumbs={{swiper: thumbsSwiper}}
                                    autoplay={true}
                                    loop={true}
                                    modules={[Autoplay, Navigation, Thumbs]}
                                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                                    className="rounded-lg border border-gray-300 shadow-sm overflow-hidden"
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
                                        <Icons.chevronLeft width={24} height={24} size={24}/>
                                    </div>
                                    <div
                                        ref={nextRef}
                                        style={{
                                            opacity: 0.3,
                                            position: "absolute",
                                            top: "50%",
                                            right: "0px",
                                            zIndex: 10,
                                            paddingLeft: "5px",
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
                                        <Icons.chevronRight
                                            className="flex justify-center items-center"
                                            width={24}
                                            height={24}
                                            size={24}
                                        />
                                    </div>
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={8}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper mt-3 px-4"
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 4,
                                            spaceBetween: 5,
                                        },
                                        640: {
                                            slidesPerView: 4,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                        },
                                        1024: {
                                            slidesPerView: 5,
                                        },
                                        1280: {
                                            slidesPerView: 7,
                                        },
                                        1536: {
                                            slidesPerView: 8,
                                        },
                                    }}
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
                        <div className="w-full md:w-2/5 ml-0 md:ml-2 mt-0 m-4 mr-0 rounded-lg shadow-sm">
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {product.options.map((option) => (
                                    <Button
                                        key={option.id}
                                        className="flex flex-col justify-center items-center rounded-xl text-primaryred1 bg-white  border border-primaryred2 hover:text-white hover:bg-primaryred1 overflow-hidden w-full h-full"
                                    >
                                        <div className=" font-bold text-sm">{option.name}</div>
                                        <div className=" text-sm">${option.value}</div>
                                    </Button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center space-x-3 my-4">
                                <Button
                                    className="rounded-lg bg-primaryred w-5/6 h-14 flex flex-col justify-center items-center text-white hover:bg-white hover:text-primaryred border  hover:border-primaryred">
                  <span className="text-sm space-y-1 flex flex-col justify-center items-center">
                    <span className="font-bold uppercase">Pay now</span>
                    <span>Shiping or take direct in the store</span>
                  </span>
                                </Button>
                                <div className="h-14 flex items-center">
                                    <Button
                                        className="flex flex-col justify-center items-center rounded-lg border text-primaryred border-primaryred bg-white w-20 h-14 transition-all duration-300 ease-in-out hover:bg-primaryred hover:text-white">
                                        <Icons.shoppingCart className="w-10 h-10 text-xl"/>
                                        <span className=" text-[12px]">Add to cart</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="my-4 space-x-3 flex justify-center items-center">
                                <div
                                    className="rounded-lg bg-primaryblue w-3/6 h-14 flex flex-col justify-center items-center">
                  <span className="text-sm text-white space-y-1 flex flex-col justify-center items-center">
                    <span className="font-bold uppercase">INSTALLMENT 0%</span>
                    <span>0% down payment</span>
                  </span>
                                </div>
                                <div
                                    className="rounded-lg bg-primaryblue w-3/6 h-14 flex flex-col justify-center items-center">
                  <span className="text-sm text-white space-y-1 flex flex-col justify-center items-center">
                    <span className="font-bold uppercase">
                      0% installment by card
                    </span>
                    <span>(VISA, Mastercard, JCB)</span>
                  </span>
                                </div>
                            </div>

                            <div className="my-4">
                                <h2 className="text-lg font-bold text-primaryred">
                                    Additional Offers
                                </h2>
                                <ul className="text-sm space-y-1">
                                    <li>
                                        <Icons.check className="text-green-400 size-3 inline-block mr-2"/>
                                        Full Accessories Included
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-3 inline-block mr-2"/>
                                        Lifetime Software Support
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-3 inline-block mr-2"/>
                                        Free Windows Installation + Machine Cleaning
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-3 inline-block mr-2"/>
                                        Support for Old-For-New Exchange - Best Price Subsidy
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <div className="my-4 w-full md:w-2/5">
                <h2 className="font-bold text-xl my-2">Product Policy</h2>
                <div className="text-sm grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Hang_chinh_hang_0b0233a2c6.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Genuine product</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Bao_hanh_9415bfe460.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Warranty (months): 12</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Mien_phi_giao_hang_3339a0ce65.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Free delivery within 90 minutes</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Cai_dat_21382ecc84.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Free installation support</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Doi_tra_59d1881db4.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Return policy</span>
                    </div>
                    <div className="flex items-center gap-x-2 mb:gap-x-3">
                        <Image
                            src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Tra_gop_0362e63008.svg"
                            width={20}
                            height={20}
                            sizes="20px"
                            alt="return"
                        />
                        <span>Installment policy</span>
                    </div>
                </div>
            </div>
            <div className="py-6 mb-6 border-b-[1px] border-b-primaryred2"></div>

            {productsRelated && productsRelated.length > 0 &&
                <>
                    <div className="my-2">
                        <ProductSlider
                            data={productsRelated}
                            pageNo={0}
                            pageSize={0}
                            totalElements={0}
                            totalPages={0}
                            isLast={false}
                        ></ProductSlider>
                    </div>
                    <div className="py-2 my-8 border-b-[1px] border-b-primaryred2"></div>
                </>
            }

            <div className="flex flex-col-reverse lg:flex-row space-x-0 lg:space-x-2 space-y-2 lg:space-y-0 justify-between">
                <div className="lg:w-4/6 w-full p-4 pt-0 pl-0">
                    <div className="mt-4 lg:mt-0 rounded-lg shadow-inner">
                        <h2 className="text-primaryred font-bold text-lg ">
                            Outstanding features
                        </h2>
                        <div dangerouslySetInnerHTML={{__html: product.description}}/>
                    </div>

                    <div className="py-2 my-4 border-b-[1px] border-b-primaryred2"></div>

                    <Rates productId={product.id!} productName={product.name}/>
                </div>
                <div className="lg:w-2/6 w-full rounded-lg shadow-inner py-4">
                    <h2 className=" font-bold text-lg">Specifications</h2>
                    <Table>
                        <TableBody>
                            {product.specifications.map((spec, index) => (
                                <TableRow
                                    key={spec.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                >
                                    <TableCell>{spec.name}</TableCell>
                                    <TableCell className="text-right">{spec.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className=" mb:border-t mb:border-neutral-gray-3 my-4 py-4">
                <div className="">
                    <div className="container">
                        <div
                            className=" flex-col md:flex-row justify-between items-center lg:grid-cols-4 grid grid-cols-2 gap-2">
                            <div className="FeaturePolicy_item__Y5K8b">
                                <div className="flex justify-center items-center">
                                    <Image
                                        sizes="65px"
                                        width={65}
                                        height={65}
                                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy1.svg"
                                        alt={""}
                                    />
                                </div>
                                <div className="text-[14px] text-center mt-4">
                                    <p className="font-bold">Guaranteed Brand</p>
                                    <p>Imported, Genuine Warranty</p>
                                </div>
                            </div>
                            <div className="FeaturePolicy_item__Y5K8b">
                                <div className="flex justify-center items-center">
                                    <Image
                                        sizes="65px"
                                        width={65}
                                        height={65}
                                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy2.svg"
                                        alt={""}
                                    />
                                </div>
                                <div className="text-[14px] text-center mt-4">
                                    <p className="font-bold">Easy Returnsàng</p>
                                    <p>According to Oralie&#39;s Return Policy</p>
                                </div>
                            </div>
                            <div className="FeaturePolicy_item__Y5K8b">
                                <div className="flex justify-center items-center">
                                    <Image
                                        sizes="65px"
                                        width={65}
                                        height={65}
                                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy3.svg"
                                        alt={""}
                                    />
                                </div>
                                <div className="text-[14px] text-center mt-4">
                                    <p className="font-bold">Quality Products</p>
                                    <p>Guaranteed Compatibility and Durability</p>
                                </div>
                            </div>
                            <div className="FeaturePolicy_item__Y5K8b">
                                <div className="flex justify-center items-center">
                                    <Image
                                        sizes="65px"
                                        width={65}
                                        height={65}
                                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy4.svg"
                                        alt={""}
                                    />
                                </div>
                                <div className="text-[14px] text-center mt-4">
                                    <p className="font-bold">Delivery to Your Doorstep</p>
                                    <p>In 63 Provinces</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPageDetail;
