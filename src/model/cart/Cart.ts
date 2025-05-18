import {CartItem} from "@/model/cart/CartItem";

export type Cart = {
    id?: number;
    userId: number;
    quantity: number;
    totalPrice: number;
    items: CartItem[];
}