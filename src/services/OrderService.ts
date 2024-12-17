import axios from "axios";
import {OrderRequest} from "@/model/order/OrderRequest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/orders';

//dash
export async function getListOrders(page: number,
                                    size: number,
                                    sortBy: string,
                                    sort: string,
                                    token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/orders`, {
            params: {
                page,
                size,
                sortBy,
                sort,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//store

//button payment by paypal
export async function createOrderWithPayPal(token: string, orderRequest: OrderRequest) {

    try {
        const response = await axios.post(`${baseUrl}/store/orders/paypal`, orderRequest, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response && response.status == 200) {
            console.log(response);
            return response.data;
        }
    } catch (error) {
        console.error("Error calling backend", error);
        throw error;
    }
}

//paypal success api
export async function successPaypalPayment(token: string, paymentId: string, PayerID: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/orders/checkout/success?paymentId=${paymentId}&PayerID=${PayerID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status == 200) {
            console.log(res);
            return res.data;
        }
    } catch (error) {
        console.error("Error calling backend payment confirmation:", error);
        throw error;
    }
}

export async function cancelPaypalPayment(token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/orders/checkout/cancel`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status == 200) {
            console.log(res);
            return res.data;
        }
    } catch (error) {
        console.error("Error calling backend payment confirmation:", error);
        throw error;
    }
}