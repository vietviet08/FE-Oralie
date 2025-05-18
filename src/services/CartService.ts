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

export async function getCartItems(token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/carts/items`, {
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


export async function addProductToCart(token: string, quantity: number, optionId: number, productId: number) {
    try {
        const res = await axios.post(`${baseUrl}/store/carts/add/${productId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {optionId, quantity},
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

export async function updateProductQuantity(token: string, productId: number, itemId: number, optionId: number, quantity: number) {
    try {
        console.log(quantity);
        const res = await axios.put(`${baseUrl}/store/carts/update/${productId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {itemId, optionId, quantity},
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

export async function removeProductFromCart(token: string, itemId: number) {
    try {
        const res = await axios.delete(`${baseUrl}/store/carts/remove/${itemId}`, {
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
