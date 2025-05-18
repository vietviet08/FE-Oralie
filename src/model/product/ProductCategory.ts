import {Category} from "@/model/category/Category";

export type ProductCategory = {
    id?: number;
    name: string;
    idProduct: number;
    category: Category;
}