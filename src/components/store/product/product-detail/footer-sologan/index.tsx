import Image from "next/image";
import React from "react";

export const FooterSologan = () => {
    return (
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
                                <p className="font-bold">Easy Return</p>
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
    )
}