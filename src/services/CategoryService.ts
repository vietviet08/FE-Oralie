import axios from "axios";
import {CategoryPost} from "@/model/category/CategoryPost";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';


export async function getListCategory(page: number,
                                      size: number,
                                      sortBy: string,
                                      sort: string,
                                      token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/categories`, {
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

export async function getCategoryById(id: number, token: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/categories/${id}`, {
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

export async function createCategory(category: CategoryPost, token: string) {
    try {
        const formData = new FormData();

        Object.keys(category).forEach(key => {
            const value = category[key as keyof CategoryPost];
            if (value !== undefined) {
                if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const res = await axios.post(`${baseUrl}/dash/categories`, formData, {
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
        if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

export async function updateCategory(id: number, category: CategoryPost, token: string) {
    try {
        const formData = new FormData();

        Object.keys(category).forEach(key => {
            const value = category[key as keyof CategoryPost];
            if (value !== undefined) {
                if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, value.toString());
                } else {
                    formData.append(key, value);
                }
            }
        });

        const res = await axios.put(`${baseUrl}/dash/categories/${id}`, formData, {
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

export async function deleteCategory(id: number, token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/dash/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
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