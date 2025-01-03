import axios from "axios";
import {BrandPost} from "@/model/brand/BrandPost";
import api from "./api/api";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';

export async function getListBrand(page: number,
                                   size: number,
                                   sortBy: string,
                                   sort: string,
                                   search: string,
                                   token: string) {

    try {
        const res = await api.get(`${baseUrl}/store/brands`, {
            params: {
                page,
                size,
                sortBy,
                sort,
                search
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res && res.status === 200) {
            return res.data;
        } else if (res && res.status === 401) {
            return null;
        }
    } catch (error) {
        console.log(error);
        // throw error;
    }
}

export async function getAllBrand() {
    try {
        const res = await axios.get(`${baseUrl}/store/brands/all`);
        if (res) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getBrandById(id: number, token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/brands/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res) {
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

        const res = await api.put(`/products/dash/brands/${id}`, formData, {
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

export async function updateAvailabelBrand(id: number, token: string) {
    try {
        const res = await axios.put(`${baseUrl}/dash/brands/available/${id}`, {}, {
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

export async function exportBrand(token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/export-brands`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res) {
            console.log("OK");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

