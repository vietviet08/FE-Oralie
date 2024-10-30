import axios from "axios";
import {PayPalInfoRequest} from "@/model/payment/PayPalInfoRequest";
import {PAYPAL_CANCEL_URL, PAYPAL_CURRENCY, PAYPAL_INTENT, PAYPAL_SUCCESS_URL} from "@/constants/data";

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
export async function createOrderWithPayPal(token: string, payPalInfoRequest: PayPalInfoRequest) {
    payPalInfoRequest.method = "paypal";
    payPalInfoRequest.currency = PAYPAL_CURRENCY;
    payPalInfoRequest.intent = PAYPAL_INTENT;
    payPalInfoRequest.cancelUrl = PAYPAL_CANCEL_URL;
    payPalInfoRequest.successUrl = PAYPAL_SUCCESS_URL;
    try {
        const response = await axios.post("/api/store/orders/paypal", payPalInfoRequest, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        if (response && response.data) {
            const {approvalUrl} = response.data;
            window.location.href = approvalUrl;
        } else {
            console.error("Failed to create PayPal order");
        }
    } catch (error) {
        console.error("Error calling backend", error);
        throw error;
    }
}

//paypal success api
export async function successPaypalPayment(token: string, paymentId: string, PayerID: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/payment/success?paymentId=${paymentId}&PayerID=${PayerID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.data) {
            return res.data;

        }
    } catch (error) {
        console.error("Error calling backend payment confirmation:", error);
        throw error;
    }
}