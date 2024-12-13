"use client";

import {Rate} from "@/model/rate/Rate";
import {useEffect, useState} from "react";
import {getAvgRateStarByProductId, getListRateByProductId} from "@/services/RateService";
import {Icons} from "@/components/icons";

type Props = {
    productId: number;
    productName: string;
};

const Rates = ({productId, productName}: Props) => {
    const [rates, setRates] = useState<Rate[]>([]);
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
                    <span className="text-lg font-semibold">{rates && rates.length > 0 ? rates.length : 0} review</span>
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
                                        className={rates && rates.length > 0 ? "bg-primaryred w-full h-3" : "bg-gray-300 w-full h-3"}
                                        style={{width: `${(rates && rates.length > 0 ? rates.filter(rate => rate.rateStar === star).length / rates.length : 0) * 100}%`}}>
                                    </div>

                                </div>
                                <span className="w-1/12 text-base">
                                    {rates && rates.length > 0 ? rates.filter(rate => rate.rateStar === star).length : 0}
                                </span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Rates;