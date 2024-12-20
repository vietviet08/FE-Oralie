"use client";

import {Rate} from "@/model/rate/Rate";
import {useEffect, useState} from "react";
import {getAvgRateStarByProductId, getListRateByProductId} from "@/services/RateService";
import {Icons} from "@/components/icons";
import Pagination from "@/components/store/Pagination";
import {ListResponse} from "@/model/ListData";
import Image from "next/image";
import {Dot} from "lucide-react";

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
                const res = await getListRateByProductId(productId, 1, 10, 'createdAt', 'desc');
                setRates(res.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchRates().then(r => r);

        async function fetchAvgRate() {
            try {
                const res = await getAvgRateStarByProductId(productId);
                setAvgRate(res);
            } catch (e) {
                console.log(e);
            }
        }

        fetchAvgRate().then(r => r);
    }, [productId]);


    return (
        <div>
            <h1 className="text-lg font-semibold ">Reviews & Comments {productName}</h1>
            <div className="flex justify-between item-center my-4">
                <div className="w-2/5 flex flex-col justify-center items-center space-y-2">
                    <span className="text-3xl text-primaryred font-semibold">{avgRate}</span>
                    <span
                        className="text-lg font-semibold">{rates && rates.totalElements > 0 ? rates.data.length : 0} review</span>
                    <div className="flex justify-center items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star, index) => {
                            if (avgRate >= star) {
                                return <Icons.star key={index} className="text-yellow-500" width={10} height={10}
                                                   size={10}/>;
                            } else if (avgRate >= star - 0.5) {
                                return <Icons.starHalf key={index} className="text-yellow-500" width={10} height={10}
                                                       size={10}/>;
                            } else {
                                return <Icons.star key={index} className="text-gray-400"/>;
                            }
                        })}
                    </div>
                </div>
                <div className="w-3/5 flex flex-col justify-between items-center gap-4">

                    {[1, 2, 3, 4, 5].map((star, index) => (
                        <div key={index} className="w-full flex justify-between items-center gap-2">
                            <div className="w-1/12 flex justify-between items-center gap-2">
                                <span className="text-base">{star}</span>
                                <Icons.star className="overflow-hidden text-yellow-500" width={20} height={20}
                                            size={20}/>
                            </div>
                            <div className="w-11/12 flex justify-between items-center gap-2">
                                <div className="w-11/12 h-3 rounded-lg overflow-hidden border">

                                    <div
                                        className={rates && rates.totalElements > 0 ? "bg-primaryred w-full h-3" : "bg-gray-300 w-full h-3"}
                                        style={{width: `${(rates && rates.totalElements > 0 ? rates.data.filter(rate => rate.rateStar === star).length / rates.data.length : 0) * 100}%`}}>
                                    </div>

                                </div>
                                <span className="w-1/12 text-base">
                                    {rates && rates.totalElements > 0 ? rates.data.filter(rate => rate.rateStar === star).length : 0}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <hr className="text-gray-200"/>
            {/*<div className="w-full flex flex-col gap-2 items-center">*/}
            {/*    {rates && rates.data && rates.data.length > 0 ? (*/}
            {/*        rates.data.map((rate, index) => (*/}
            {/*            <div key={index} className="w-full flex justify-between items-center gap-2">*/}
            {/*                <div className="w-1/12 flex justify-between items-center gap-2">*/}
            {/*                    <span className="text-base">{rate.rateStar}</span>*/}
            {/*                    <Icons.star className="overflow-hidden text-yellow-500" width={20} height={20}*/}
            {/*                                size={20}/>*/}
            {/*                </div>*/}
            {/*                <div className="w-11/12 flex justify-between items-center gap-2">*/}
            {/*                    <div className="w-11/12 flex justify-between items-center gap-2">*/}
            {/*                        <span className="text-base">{rate.content}</span>*/}
            {/*                    </div>*/}
            {/*                    <span className="w-1/12 text-base">{rate.createdAt}</span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))*/}

            {/*    ) : (*/}
            {/*        <div className="flex justify-center items-center h-20 my-4">*/}
            {/*            <span className="text-xl text-gray-400">No review yet</span>*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            {/*{rates && rates.totalElements > 0 ? <Pagination listResponse={rates}/> : null}*/}
            <div className="w-full flex flex-col gap-2 items-center my-4">
                <div className="w-full flex justify-between items-center gap-4">
                    <div className="w-1/12 flex justify-center items-center rounded-full overflow-hidden">
                        <Image
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH3MW7eGaYWiRrk3AajqEiCFQBJwgSTULhyw&s"}
                            alt={""} width={120} height={120} className={"w-12 h-12 object-cover rounded-full"}/>
                    </div>
                    <div className="w-11/12 flex flex-col justify-center items-start gap-2">
                        <div className="flex justify-start items-center">
                            <span className="text-base font-bold">Name user</span>
                            <Dot fill={"gray"} className="w-6 h-6"/>
                            <span className="text-base">11-22-24 12:28</span>
                        </div>
                        <div className="flex items-center justify-start ">
                            {[1, 2, 3, 4, 5].map((star, index) => (
                                <Icons.star fill={"yellow"} key={index} className="overflow-hidden text-yellow-500" width={20} height={20} size={20} />
                            ))}
                        </div>
                        <span className="w-full text-base">This is the content</span>
                        <div className="flex justify-start items-center gap-1">
                            <Icons.thumbsUp  width={6} height={6} className="w-5 h-5 pb-1"/>
                            <p className="test-xs">10</p>
                        </div>
                    </div>
                </div>
            </div>
            {rates && <Pagination listResponse={rates}/>}
        </div>
    )
}

export default Rates;