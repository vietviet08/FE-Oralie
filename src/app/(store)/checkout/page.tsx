import React from "react";
import {CartResponse} from "@/model/cart/CartResponse";
import CheckoutTemplate from "@/components/store/checkout/CheckoutTemplate";

const CheckoutPage: React.FC<{ data: CartResponse }> = ({data}) => {
    return (
        <CheckoutTemplate data={data}/>
    );
}

export default CheckoutPage;