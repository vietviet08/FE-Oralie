import {Rate} from "@/model/rate/Rate";

export type RatePost = {
    id?: number | undefined;
    userId: string;
    productId: number;
    orderItemId: number;
    rateStar: number;
    content: string;
    files: File[];
    isAvailable: boolean;
    parentRate: number;
    subRates: Rate[];
}