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
import Image from "next/image";
import {getTop10ProductRelatedCategory} from "@/services/ProductService";
import {addProductToCart} from "@/services/CartService";
import {useSession} from "next-auth/react";
import Link from "next/link";
import toast from 'react-hot-toast';
import {FooterSologan} from "@/components/store/product/product-detail/footer-sologan";
import {ProductSpecification} from "@/components/store/product/product-detail/product-specification";
import {ProductPolicy} from "@/components/store/product/product-detail/product-policy";

type Props = {
    product: Product;
};

const ProductPageDetail = ({product}: Props) => {
    const {data: session} = useSession();
    const token = session?.access_token as string;


    const [selectedOptionId, setSelectedOptionId] = useState<number>(product.options[0].id!);
    const [quantity, setQuantity] = useState<number>(1);

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
    }, [swiperRef]);

    useEffect(() => {
        async function fetchTop10ProductRelated() {
            if (product.id && product.productCategories?.[0]?.category?.name) {
                const response = await getTop10ProductRelatedCategory(product.id, product.productCategories[0].category.name);
                setProductsRelated(response);
            }
        }

        fetchTop10ProductRelated().then(r => r);
    }, [product.id, product.productCategories]);

    const handleAddToCart = async (quantity: number, productId: number, optionId: number) => {

        const res = await addProductToCart(token, quantity, optionId, productId);

        if (res) {
            toast.success("Add to cart successfully", {
                position: "bottom-right",
                duration: 3000,
            });
        } else {
            toast.error("Add to cart failed", {
                position: "bottom-right",
                duration: 3000,
            });
        }
        setQuantity(1);
    };

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 w-full py-4">
                <div className="w-full md:w-4/5">
                    <h2 className="text-2xl font-bold text-black">{product.name}</h2>
                    <span className="text-sm my-2">
                        SKU: {product.sku} - Brand: {product.brand?.name}
                    </span>
                </div>
                <div className="w-full md:w-1/5 flex justify-start items-center md:justify-end">
                    {product.isAvailable ? (
                        <Badge
                            variant={"allower"}
                            className="w-24 h-8 text-center flex justify-center items-center rounded-2xl border-allowertext"
                        >
                            <span className="text-[10px]">Status: Stock</span>
                        </Badge>
                    ) : (
                        <Badge
                            variant={"destructive"}
                            className="w-32 h-8 text-center flex justify-center items-center rounded-2xl border-primaryred"
                        >
                            <span className="text-[10px]">Status: Out of stock</span>
                        </Badge>
                    )}
                </div>
            </div>
            <div className=" border-b-[1px] border-b-primaryred2"></div>
            <div className="pt-8">
                <main>
                    <div className="flex flex-col lg:flex-row md:justify-center ">
                        <div className="w-full lg:w-3/5 mr-0 md:mr-2 mt-0 m-4 ml-0 ">
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
                                                <Image
                                                    width={500}
                                                    height={500}
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
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={image.url}
                                                    alt={product.name}
                                                    className="absolute left-0 top-0 w-20 h-20 object-cover"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <ProductPolicy/>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/5 ml-0 md:ml-2 mt-0 m-4 mr-0 rounded-lg ">
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {product.options.map((option) => (
                                    <Button
                                        key={option.id}
                                        className={`flex flex-col justify-center items-center rounded-xl text-primaryred1 bg-white border border-primaryred2 hover:text-white hover:bg-primaryred1 overflow-hidden w-full h-full ${selectedOptionId === option.id ? 'bg-primaryred1 text-white' : 'bg-transparent'}`}
                                        onClick={() => setSelectedOptionId(option.id!)}
                                    >
                                        <div className=" font-bold text-sm">{option.name}</div>
                                        <div className=" text-sm">$ {option.value}</div>
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
                                        className="flex flex-col justify-center items-center rounded-lg border text-primaryred border-primaryred bg-white w-20 h-14 transition-all duration-300 ease-in-out hover:bg-primaryred hover:text-white"
                                        onClick={() => handleAddToCart(quantity, product.id!, selectedOptionId)}
                                    >
                                        <Icons.shoppingCart className="w-10 h-10 text-xl"/>
                                        <span className=" text-[12px]">Add to cart</span>
                                    </Button>

                                </div>
                            </div>

                            <div
                                className="my-4 flex flex-row lg:flex-col xl:flex-row justify-center items-center gap-2">
                                <div
                                    className="rounded-lg bg-primaryblue w-3/6 md:w-full h-14 flex flex-col justify-center items-center m-0">
                                      <span
                                          className="text-sm text-white space-y-1 flex flex-col justify-center items-center">
                                        <span className="font-bold uppercase">INSTALLMENT 0%</span>
                                        <span>0% down payment</span>
                                      </span>
                                </div>
                                <div
                                    className="rounded-lg bg-primaryblue w-3/6 md:w-full h-14 flex flex-col justify-center items-center m-0">
                                      <span
                                          className="text-sm text-white space-y-1 flex flex-col justify-center items-center">
                                                <span className="font-bold uppercase">
                                                  0% installment by card
                                                </span>
                                        <span>(VISA, Mastercard, JCB)</span>
                                      </span>
                                </div>
                            </div>

                            <div className="my-4 rounded-xl border border-gray-200 overflow-hidden">
                                <h2 className="text-md font-bold text-primaryred  bg-gray-100 px-4 py-2.5">
                                    Additional Offers
                                </h2>
                                <ul className="text-sm space-y-1 px-4 py-3">
                                    <li>
                                        <Icons.check className="text-green-400 size-4 inline-block mr-2"/>
                                        Full Accessories Included
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-4 inline-block mr-2"/>
                                        Lifetime Software Support
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-4 inline-block mr-2"/>
                                        Free Windows Installation + Machine Cleaning
                                    </li>
                                    <li>
                                        <Icons.check className="text-green-400 size-4 inline-block mr-2"/>
                                        Support for Old-For-New Exchange - Best Price Subsidy
                                    </li>
                                </ul>
                            </div>

                            <div
                                className="flex flex-col overflow-hidden bg-white mb:container-full rounded-xl border border-gray-200">
                                <h3 className="text-md text-primaryred text-black-opacity-100 font-semibold px-4 py-2.5 bg-gray-100">
                                    Other gifts and promotions
                                </h3>
                                <div className="flex flex-col gap-2 text-sm px-4 py-3">
                                    <div className="flex gap-1 ">
                                        <div className="h-7 w-7 flex-shrink-0 p-0.5 pt-1.5">
                                            <Image width={30} height={30}
                                                   src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/gift.svg"}
                                                   alt={""}>
                                            </Image>
                                        </div>
                                        <div className="flex min-h-7 items-center pt-1.5">
                                            <p
                                                className="text-black ">
                                                <span>Free 150,000 VND voucher for Backpacks, Shockproof Bags (Valid for 15 days)</span>&nbsp;
                                                <Link className="text-blue-blue-7 hover:underline" target="_blank"
                                                      href="#">
                                                    See details
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-7 w-7 flex-shrink-0 p-0.5 pt-1.5">
                                            <Image width={30} height={30}
                                                   src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/gift.svg"}
                                                   alt={""}>
                                            </Image>
                                        </div>
                                        <div className="flex min-h-7 items-center pt-1.5">
                                            <p
                                                className="text-black-opacity-100 ">
                                                <span>Free 300,000 VND voucher for monitors (Valid for 15 days)</span>&nbsp;
                                                <Link className="text-blue-blue-7 hover:underline" target="_blank"
                                                      href="#">See details
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-7 w-7 flex-shrink-0 p-0.5 pt-1.5">
                                            <Image width={30} height={30}
                                                   src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/gift.svg"}
                                                   alt={""}>
                                            </Image>
                                        </div>
                                        <div className="flex min-h-7 items-center pt-1.5">
                                            <p
                                                className="text-black-opacity-100 ">
                                                <span>Save 600,000 VND when buying Microsoft 365 Personal with device</span>&nbsp;
                                                <Link className="text-blue-blue-7 hover:underline" target="_blank"
                                                      href="#">See details
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="h-7 w-7 flex-shrink-0 p-0.5 pt-1.5">
                                            <Image width={30} height={30}
                                                   src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/gift.svg"}
                                                   alt={""}>
                                            </Image>
                                        </div>
                                        <div className="flex min-h-7 items-center pt-1.5">
                                            <p
                                                className="text-black-opacity-100 ">
                                                <span>Free 3% discount code when buying Tablets, Smartwatches, Electronics</span>&nbsp;
                                                <Link className="text-blue-blue-7 hover:underline" target="_blank"
                                                      href="#">See details
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
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
                            title={"Related Products"}
                        />
                    </div>
                    <div className="py-2 my-8 border-b-[1px] border-b-primaryred2"></div>
                </>
            }

            <ProductSpecification product={product}/>

            <FooterSologan/>
        </div>
    );
};

export default ProductPageDetail;
