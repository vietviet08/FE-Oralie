import axios from "axios";
import {Category} from "@/model/category/Category";
import apiClientService from "@/utils/ApiClientService";
import {applyCors} from "@/utils/cors";
import {CategoryGet} from "@/model/category/CategoryGet";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';
const baseUrlTest = "http://localhost:8081";


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

export async function createCategory(category: Category, token: string) {
    try {

        const res = await axios.post(`${baseUrl}/dash/categories`, category, {
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

export async function updateCategory(id: number, category: CategoryGet, token: string) {
    try {
        const res = await axios.put(`${baseUrl}/dash/categories/${id}`, category, {
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