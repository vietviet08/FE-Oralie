import Image from "next/image";
import React from "react";

export const ProductPolicy = () => {
    return (
        <div className="my-3 sm:my-4 w-full">
            <h2 className="font-bold text-base sm:text-lg md:text-xl my-2">Product Policy</h2>
            <div className="text-xs sm:text-sm grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Hang_chinh_hang_0b0233a2c6.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Genuine product"
                    />
                    <span>Genuine product</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Bao_hanh_9415bfe460.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Warranty"
                    />
                    <span>Warranty (months): 12</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Mien_phi_giao_hang_3339a0ce65.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Free delivery"
                    />
                    <span>Free delivery within 90 minutes</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Cai_dat_21382ecc84.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Installation support"
                    />
                    <span>Free installation support</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Doi_tra_59d1881db4.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Return policy"
                    />
                    <span>Return policy</span>
                </div>
                <div className="flex items-center gap-x-2">
                    <Image
                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/Type_Tra_gop_0362e63008.svg"
                        width={20}
                        height={20}
                        sizes="(max-width: 640px) 16px, 20px"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        alt="Installment policy"
                    />
                    <span>Installment policy</span>
                </div>
            </div>
        </div>
    )
}