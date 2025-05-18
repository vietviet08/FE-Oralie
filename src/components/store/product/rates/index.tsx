"use client";

import {Rate} from "@/model/rate/Rate";
import {useEffect, useState} from "react";
import {getAvgRateStarByProductId, getListRateByProductId} from "@/services/RateService";
import {Icons} from "@/components/icons";
import Pagination from "@/components/store/Pagination";
import {ListResponse} from "@/model/ListData";
import Image from "next/image";
import {Dot} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type Props = {
    productId: number;
    productName: string;
};

const Rates = ({productId, productName}: Props) => {
    const [rates, setRates] = useState<ListResponse<Rate>>();
    const [avgRate, setAvgRate] = useState<number>(0.0);

    useEffect(() => {
        async function fetchRates() {
            try {
                const res = await getListRateByProductId(productId, 0, 10, 'id', 'asc');
                setRates(res);
                console.log(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchRates();

        async function fetchAvgRate() {
            try {
                const res = await getAvgRateStarByProductId(productId);
                setAvgRate(res);
            } catch (e) {
                console.log(e);
            }
        }

        fetchAvgRate();
    }, [productId]);

    return (
        <div className="w-full">
            <h1 className="text-base sm:text-lg font-semibold">Reviews & Comments {productName}</h1>
            <div className="flex flex-col md:flex-row justify-between item-center my-2 sm:my-4 gap-4 md:gap-0">
                <div className="w-full md:w-2/5 flex flex-col justify-center items-center space-y-1 sm:space-y-2">
                    <span className="text-xl sm:text-3xl text-primaryred font-semibold">{avgRate}</span>
                    <span className="text-sm sm:text-lg font-semibold">
                        {rates && rates.totalElements > 0 ? rates.totalElements : 0} review
                    </span>
                    <div className="flex justify-center items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star, index) => {
                            if (avgRate >= star) {
                                return <Icons.star key={index} className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />;
                            } else if (avgRate >= star - 0.5) {
                                return <Icons.starHalf key={index} className="text-yellow-500 w-3 h-3 sm:w-4 sm:h-4" />;
                            } else {
                                return <Icons.star key={index} className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />;
                            }
                        })}
                    </div>
                </div>
                <div className="w-full md:w-3/5 flex flex-col justify-between items-center gap-2 sm:gap-4">
                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <div key={index} className="w-full flex justify-between items-center gap-2">
                            <div className="w-2/12 md:w-1/12 flex justify-start md:justify-between items-center gap-1">
                                <span className="text-xs sm:text-sm md:text-base">{star}</span>
                                <Icons.star className="overflow-hidden text-yellow-500 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="text-yellow-500" />
                            </div>
                            <div className="w-10/12 md:w-11/12 flex justify-between items-center gap-1 sm:gap-2">
                                <div className="w-10/12 md:w-11/12 h-2 sm:h-3 rounded-lg overflow-hidden border">
                                    <div
                                        className={rates && rates.totalElements > 0 ? "bg-primaryred h-full" : "bg-gray-300 h-full"}
                                        style={{width: `${(rates && rates.totalElements > 0 ? rates.data.filter(rate => rate.rateStar === star).length / rates.data.length : 0) * 100}%`}}>
                                    </div>
                                </div>
                                <span className="w-2/12 md:w-1/12 text-xs sm:text-sm md:text-base text-right">
                                    {rates && rates.totalElements > 0 ? rates.data.filter(rate => rate.rateStar === star).length : 0}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr className="text-gray-200 my-2 sm:my-3"/>
            {rates && rates.totalElements > 0 ? (
                rates.data.map((rate, index) => (
                    <div key={index} className="w-full flex flex-col gap-2 items-center my-3 sm:my-4">
                        <div className="w-full flex justify-start items-start gap-2 sm:gap-4">
                            <div className="w-2/12 sm:w-1/12 flex justify-start items-start">
                                {rate.userInfo.urlAvatar ? 
                                    <Image
                                        src={rate.userInfo.urlAvatar}
                                        alt={rate.userInfo.fullName || "User avatar"} 
                                        width={48} 
                                        height={48}
                                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded-full"
                                    /> :
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12">
                                        <AvatarImage
                                            src={rate.userInfo.fullName ?? ''}
                                            alt={rate.userInfo.fullName ?? ''}
                                        />
                                        <AvatarFallback>{rate.userInfo.fullName}</AvatarFallback>
                                    </Avatar>
                                }
                            </div>
                            <div className="w-10/12 sm:w-11/12 flex flex-col justify-start items-start gap-1 sm:gap-2">
                                <div className="flex flex-wrap justify-start items-center">
                                    <span className="text-sm sm:text-base font-bold">{rate.userInfo.fullName}</span>
                                    <Dot fill="gray" className="w-4 h-4 sm:w-6 sm:h-6"/>
                                    <span className="text-xs sm:text-sm text-gray-600">{rate.latestDateModified}</span>
                                </div>
                                <div className="flex items-center justify-start">
                                    {[...Array(5)].map((_, index) => (
                                        <Icons.star
                                            key={index}
                                            fill={`${index < rate.rateStar ? "text-yellow-500" : "text-gray-400"}`}
                                            className={`overflow-hidden ${index < rate.rateStar ? "text-yellow-500" : "text-gray-400"} w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5`}
                                        />
                                    ))}
                                </div>
                                <span className="w-full text-xs sm:text-sm md:text-base">{rate.content}</span>
                                <div className="flex justify-start items-center gap-1">
                                    <Icons.thumbsUp className="w-4 h-4 sm:w-5 sm:h-5 pb-1"/>
                                    <p className="text-xs sm:text-sm">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex justify-center items-center h-16 sm:h-20 my-2 sm:my-4">
                    <span className="text-base sm:text-xl text-gray-400">No review yet</span>
                </div>
            )}
            {rates && <Pagination listResponse={rates}/>}
        </div>
    )
}

export default Rates;