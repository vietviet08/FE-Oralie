import {ProductCategory} from "@/model/product/ProductCategory";
import {Brand} from "@/model/brand/Brand";
import {ProductOption} from "@/model/product/ProductOption";

export type Product = {

    id?: number;
    name: string;
    slug: string;
    description: string;
    sku: string;
    productCategories?: ProductCategory[];
    brand?: Brand;
    options: ProductOption[];
    price: number;
    isDiscount: boolean;
    discount: number;
    quantity: number;
    isAvailable?: boolean;
    isDeleted?: boolean;
    isFeatured: boolean;
    isPromoted: boolean;

}