import { ProductOption } from "./ProductOption";
import { ProductSpecification } from "./ProductSpecification";

export type ProductPost = {
    name?: string;
    slug: string;
    description: string;
    sku?: string;
    categoryIds?: number[];
    brandId?: number;
    images?: File[];
    options?: ProductOption[];
    specifications?: ProductSpecification[];
    price: number;
    discount?: number;
    quantity: number;
    isDiscounted?: boolean;
    isAvailable?: boolean;
    isDeleted?: boolean;
    isFeatured?: boolean;
}