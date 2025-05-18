import {OrderItemRequest} from "@/model/order/OrderItemRequest";
import {OrderAddressRequest} from "@/model/order/OrderAddressRequest";

export type OrderRequest = {
    address: OrderAddressRequest;
    orderItems: OrderItemRequest[];
    totalPrice: number;
    voucher: string;
    discount: number;
    shippingFee: number;
    status: string;
    shippingMethod: string;
    paymentMethod: string;
    paymentStatus: string;
    note: string;
}
