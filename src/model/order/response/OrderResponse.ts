import {OrderAddressResponse} from "@/model/order/response/OrderAddressResponse";
import {OrderItemResponse} from "@/model/order/response/OrderItemResponse";

export type OrderResponse = {
    id?: number;
    userId: number;
    cartId: number;
    address: OrderAddressResponse;
    orderItems: OrderItemResponse[];
    totalPrice: number;
    voucher?: string;
    discount?: number;
    shippingFee?: number;
    status: string;
    shippingMethod: string;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
    note?: string;
}