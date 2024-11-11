import axios from "axios";
import {Brand} from "@/model/brand/Brand";
import {CategoryPost} from "@/model/category/CategoryPost";
import {BrandPost} from "@/model/brand/BrandPost";
import { testUrlProductService } from "@/constants/data";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';


export async function getListBrand(page: number,
                                   size: number,
                                   sortBy: string,
                                   sort: string,
                                   token: string) {

    const testUrl = testUrlProductService + "/dash/brands";
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

        if (res && res.status === 200) {
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

export async function createBrand(brand: BrandPost, token: string) {
    try {

        const formData = new FormData();

        Object.keys(brand).forEach(key => {
            const value = brand [key as keyof BrandPost];
            if (value !== undefined) {
                if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        const res = await axios.post(`${baseUrl}/dash/brands`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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

export async function updateBrand(id: number, brand: BrandPost, token: string) {
    try {

        const formData = new FormData();

        Object.keys(brand).forEach(key => {
            const value = brand[key as keyof BrandPost];
            if (value !== undefined) {
                if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        const res = await axios.put(`${baseUrl}/dash/brands/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
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

export async function updateAvailabelBrand(id: number, token: string){
    try {
        const res = await axios.put(`${baseUrl}/dash/brands/available/${id}`,{}, {
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

export async function deleteBrand(id: number, token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/dash/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.status === 204) {
            console.log(res);
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
