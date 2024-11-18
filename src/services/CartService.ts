import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/carts';

export async function getCart(token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/carts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function addProductToCart(token: string, quantity: number, productId: number) {
    try {
        const res = await axios.post(`${baseUrl}/store/carts/add/${productId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {quantity},
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateProductQuantity(token: string, productId: number, quantity: number) {
    try {
        const res = await axios.put(`${baseUrl}/store/carts/update/${productId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {quantity},
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function removeProductFromCart(token: string, productId: number) {
    try {
        const res = await axios.delete(`${baseUrl}/store/carts/remove/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function clearCart(token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/store/carts/clear`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res && res.status === 200) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
