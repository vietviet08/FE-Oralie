import Image from "next/image";
import React from "react";

export const FooterSologan = () => {
    return (
        <div className="my-4 py-4 border-t border-neutral-gray-3">
            <div className="container mx-auto px-2 sm:px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center">
                            <Image
                                sizes="(max-width: 640px) 45px, 65px"
                                width={65}
                                height={65}
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy1.svg"
                                alt="Guaranteed Brand"
                            />
                        </div>
                        <div className="text-xs sm:text-sm md:text-[14px] text-center mt-2 sm:mt-4">
                            <p className="font-bold">Guaranteed Brand</p>
                            <p>Imported, Genuine Warranty</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center">
                            <Image
                                sizes="(max-width: 640px) 45px, 65px"
                                width={65}
                                height={65}
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy2.svg"
                                alt="Easy Return"
                            />
                        </div>
                        <div className="text-xs sm:text-sm md:text-[14px] text-center mt-2 sm:mt-4">
                            <p className="font-bold">Easy Return</p>
                            <p>According to Oralie&#39;s Return Policy</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center">
                            <Image
                                sizes="(max-width: 640px) 45px, 65px"
                                width={65}
                                height={65}
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy3.svg"
                                alt="Quality Products"
                            />
                        </div>
                        <div className="text-xs sm:text-sm md:text-[14px] text-center mt-2 sm:mt-4">
                            <p className="font-bold">Quality Products</p>
                            <p>Guaranteed Compatibility and Durability</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center">
                            <Image
                                sizes="(max-width: 640px) 45px, 65px"
                                width={65}
                                height={65}
                                className="w-12 h-12 sm:w-16 sm:h-16"
                                src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/policy4.svg"
                                alt="Delivery to Your Doorstep"
                            />
                        </div>
                        <div className="text-xs sm:text-sm md:text-[14px] text-center mt-2 sm:mt-4">
                            <p className="font-bold">Delivery to Your Doorstep</p>
                            <p>In 63 Provinces</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}