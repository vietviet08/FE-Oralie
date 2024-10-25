import axios from "axios";
import {Category} from "@/model/category/Category";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';

export async function getListCategory(page: number,
                                      size: number,
                                      sortBy: string,
                                      sort: string) {
    try {
        const res = await axios.get(`${baseUrl}/dash/categories`, {
            params: {
                page,
                size,
                sortBy,
                sort,
            }
        });

        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoryById(id: number) {
    try {
        const res = await axios.get(`${baseUrl}/dash/categories/${id}`);
        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function createCategory(category: Category) {
    try {
        const res = await axios.post(`${baseUrl}/dash/categories`, category);
        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}