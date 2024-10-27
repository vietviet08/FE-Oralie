import axios from "axios";
import {Brand} from "@/model/brand/Brand";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';


export async function getListBrand(page: number,
                                   size: number,
                                   sortBy: string,
                                   sort: string,
                                   token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/brands`, {
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

export async function getBrandById(id: number, token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/brands/${id}`, {
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

export async function createBrand(brand: Brand, token: string) {
    try {

        const res = await axios.post(`${baseUrl}/dash/brands`, brand, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.data) {
            console.log(res.data);
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateBrand(id: number, brand: Brand, token: string) {
    try {

        const res = await axios.put(`${baseUrl}/dash/brands/${id}`, brand, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.data) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteBrand(id: number, token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/dash/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res) {
            console.log(res);
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
