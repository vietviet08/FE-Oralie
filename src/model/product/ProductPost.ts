import { ProductOption } from "./ProductOption";
import { ProductSpecification } from "./ProductSpecification";

export type ProductPost = {
    id?: number;
    name: string;
    slug?: string;
    description: string;
    sku?: string;
    price: number;
    discount?: number;
    quantity: number;
    isDiscounted?: boolean;
    isAvailable?: boolean;
    isDeleted?: boolean;
    isFeatured?: boolean;
    isPromoted?: boolean;
    categoryIds?: number[];
    brandId?: number;
    images?: File[];
    deletedImageUrls?: string[];
    existingImageUrls?: string[];
    options?: { name: string, value: string }[];
    specifications?: { name: string, value: string }[];
}