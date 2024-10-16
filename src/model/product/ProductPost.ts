import {ProductOption} from "@/model/product/ProductOption";

export type ProductPost = {
    name?: string;
    slug: string;
    description: string;
    sku?: string;
    categoryIds?: number[];
    brandId?: number;
    imagesUrl?: string[];
    options?: ProductOption[];
    price: number;
    discount?: number;
    quantity: number;
    isDiscounted?: boolean;
    isAvailable?: boolean;
    isDeleted?: boolean;
    isFeatured?: boolean;
}