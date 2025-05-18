import {Rate} from "@/model/rate/Rate";
import {UserInfo} from "@/model/rate/UserInfo";

export type RatePost = {
    id?: number | undefined;
    userInfo: UserInfo;
    productId: number;
    orderItemId: number;
    rateStar: number;
    content: string;
    files: File[];
    isAvailable: boolean;
    parentRate: number;
    subRates: Rate[];
}