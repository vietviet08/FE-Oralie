import {ProductCategory} from "@/model/product/ProductCategory";
import {Brand} from "@/model/brand/Brand";
import {ProductOption} from "@/model/product/ProductOption";
import { ProductImage } from "./ProductImage";
import { ProductSpecification } from "./ProductSpecification";

export type Product = {

    id?: number;
    name: string;
    images: ProductImage[];
    slug: string;
    description: string;
    sku: string;
    productCategories?: ProductCategory[];
    brand?: Brand;
    options: ProductOption[];
    specifications: ProductSpecification[];
    price: number;
    isDiscounted: boolean;
    discount: number;
    quantity: number;
    isAvailable?: boolean;
    isDeleted?: boolean;
    isFeatured: boolean;
    isPromoted: boolean;

}