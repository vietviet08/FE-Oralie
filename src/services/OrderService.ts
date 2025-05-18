import axios from "axios";
import {OrderRequest} from "@/model/order/OrderRequest";

// Add debugging for API URL
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log("API Base URL from env:", apiBaseUrl);
const baseUrl = apiBaseUrl + '/api/orders';
console.log("Full API Base URL:", baseUrl);

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

export async function updateStatusOrder(token: string, orderId: number, status: string) {
    try {
        console.log("Updating order status with token:", token ? token.substring(0, 15) + "..." : "MISSING TOKEN");
        console.log("Order ID:", orderId);
        console.log("Target status:", status);
        
        const res = await axios.put(`${baseUrl}/dash/orders/${orderId}/status?status=${status}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Update order status response:", res);
        return res.data;
    } catch (error) {
        console.error("Error calling backend payment confirmation:", error);
        throw error;
    }
}

export async function deleteOrder(token: string, orderId: number) {
    try {
        const res = await axios.delete(`${baseUrl}/dash/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status == 204) {
            console.log(res);
            return res;
        }
    } catch (error) {
        console.error("Error calling backend payment confirmation:", error);
        throw error;
    }
}

//store
export async function getOrders(token: string) {
    try {
        const response = await axios.get(`${baseUrl}/store/orders`, {
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

export async function getOrderDetail(token: string, orderId: number) {
    try {
        const response = await axios.get(`${baseUrl}/store/orders/${orderId}`, {
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

export async function cancelOrderByCustomer(token: string, orderId: number) {
    try {
        const response = await axios.put(`${baseUrl}/store/orders/${orderId}/cancel`, null, {
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

//checkout
export async function createOrder(token: string, orderRequest: OrderRequest) {
    try {
        const response = await axios.post(`${baseUrl}/store/orders`, orderRequest, {
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


//button payment by paypal
export async function createOrderWithPayPal(token: string, orderRequest: OrderRequest) {
    try {
        const url = `${baseUrl}/store/orders/paypal`;
        console.log("PayPal API URL:", url);
        console.log("PayPal Request Headers:", { Authorization: `Bearer ${token}` });
        console.log("PayPal Request Data:", JSON.stringify(orderRequest, null, 2));
        
        // Fix the axios call to properly send the Authorization header
        const response = await axios({
            method: 'post',
            url: url,
            data: orderRequest,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("PayPal API Response Status:", response.status);
        console.log("PayPal API Response Data:", response.data);
        
        const responseData = response.data;
        
        // Ensure we have the link property from the backend
        return {
            ...responseData,
            link: responseData.linkPaypalToExecute || responseData.link || null
        };
    } catch (error: any) {
        console.error("Error calling backend", error);
        
        // Try to extract useful data from the error response
        if (error.response && error.response.data) {
            console.log("Error response data:", error.response.data);
            
            // If the backend returned any data despite the 400 error, try to use it
            // This is important because the backend might still have generated a PayPal URL
            const errorData = error.response.data;
            
            if (typeof errorData === 'object' && errorData !== null) {
                // If we have any data at all, especially the link, return it
                return {
                    ...errorData,
                    link: errorData.linkPaypalToExecute || errorData.link || null,
                    error: true,
                    status: error.response.status
                };
            }
        }
        
        // If there's no useful data in the error response, throw the error
        throw error;
    }
}

//paypal success api
export async function successPaypalPayment(token: string, paymentId: string, PayerID: string) {
    try {
        const url = `${baseUrl}/store/orders/checkout/success?paymentId=${paymentId}&PayerID=${PayerID}`;
        console.log("PayPal Success API URL:", url);
        
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status == 200) {
            console.log("PayPal Success Response:", res.data);
            return res.data;
        }
    } catch (error: any) {
        console.error("Error calling backend payment confirmation:", error);
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
        }
        throw error;
    }
}

export async function cancelPaypalPayment(token: string) {
    try {
        const url = `${baseUrl}/store/orderscheckout/cancel`;
        console.log("PayPal Cancel API URL:", url);
        
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status == 200) {
            console.log("PayPal Cancel Response:", res.data);
            return res.data;
        }
    } catch (error: any) {
        console.error("Error calling backend payment confirmation:", error);
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
        }
        throw error;
    }
}


