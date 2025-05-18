import {ProductOption} from "@/model/product/ProductOption";

export type CartItemResponse = {
    id?: number;
    productId: number;
    productName: string;
    productOptionId: number,
    productOptions: ProductOption[];
    urlImageThumbnail: string;
    productSlug: string;
    quantity: number;
    price: number;
    totalPrice: number;
}