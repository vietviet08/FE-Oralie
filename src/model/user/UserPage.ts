import {UserGet} from "@/model/user/UserGet";

export type UserPage = {
    data: UserGet[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
}