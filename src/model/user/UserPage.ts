import {UserRes} from "@/model/user/UserRes";

export type UserPage = {
    data: UserRes[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;
}