import {Rate} from "@/model/rate/Rate";

export type RatePost = {
    id: number;
    userId: string;
    productId: number;
    rateStar: number;
    content: string;
    urlFile: string[];
    parentRate: number;
    subRates: Rate[];
}