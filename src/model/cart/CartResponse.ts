import {CartItemResponse} from "@/model/cart/CartItemResponse";

export type CartResponse = {
    id?: number;
    userId: number;
    quantity: number;
    totalPrice: number;
    cartItemResponses: CartItemResponse[];
}