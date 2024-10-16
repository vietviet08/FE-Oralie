import {OrderAddress} from "@/model/order/OrderAddress";
import {OrderItem} from "@/model/order/OrderItem";

export type Order = {
    id?: number;
    userId: number;
    cartId: number;
    address: OrderAddress;
    orderItems: OrderItem[];
    totalPrice: number;
    voucherId?: string;
    discount?: number;
    shippingFee?: number;
    status: string;
    shippingMethod: string;
    paymentMethod: string;
    paymentStatus: string;
    note?: string;
}