import {UserInfo} from "@/model/rate/UserInfo";
import {UserRateComment} from "@/model/rate/UserRateComment";

export type Rate = {
    id?: number;
    userInfo: UserInfo;
    productId: number;
    orderItemId: number;
    rateStar: number;
    content: string;
    urlFile: string[];
    latestDateModified: string;
    listUserLike: UserRateComment[];
    totalLike: number;
    totalDislike: number;
    isAvailable: boolean;
    parentRate: number;
    subRates: Rate[];
}