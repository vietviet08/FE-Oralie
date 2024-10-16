import {Product} from "@/model/product/Product";

export type ProductPage = {

    data: Product[];
    pageNo: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isLast: boolean;

}