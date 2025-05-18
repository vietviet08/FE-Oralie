import axios from "axios";
import {CategoryPost} from "@/model/category/CategoryPost";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';


export async function getListCategory(page: number,
                                      size: number,
                                      sortBy: string,
                                      sort: string,
                                      search: string,
                                      token: string) {

    try {
        const res = await axios.get(`${baseUrl}/store/categories/all`, {
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
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllCategoryNotParent() {
    try {
        const res = await axios.get(`${baseUrl}/store/categories/not-parent`);
        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAllCategoriesSameParentBySlug(slug: string) {
    try {
        if (!slug || slug.trim() === '') {
            console.log("Skipping API call with empty slug");
            return [];
        }
        
        const res = await axios.get(`${baseUrl}/store/categories/same-parent/${slug}`);
        if (res) {
            console.log(res.data);
            return res.data;
        }
    } catch (error) {
        console.log("Error in getAllCategoriesSameParentBySlug:", error);
        return [];
    }
}

export async function getAllCategoriesNotId(id: number, notId: boolean) {

    try {
        const res = await axios.get(`${baseUrl}/store/categories/not-id/${id}`, {
            params: {
                notId
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


export async function getAllCategoryContainsName(name: string) {

    try {
        const res = await axios.get(`${baseUrl}/store/categories/contains-name`, {
            params: {
                name
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


export async function getCategoryById(id: number, token: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/categories/${id}`, {
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

export async function getCategoryByName(name: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/categories/by-name/${name}`);
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
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === "number" || typeof value === "boolean") {
                    formData.append(key, value.toString());
                } else if (typeof value === 'string') {
                    formData.append(key, value);
                }
            }
        });

        // Log the request headers and token for debugging
        console.log('Token used:', token);
        
        const res = await axios.put(`${baseUrl}/dash/categories/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
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

export async function updateAvailableCategory(id: number, token: string) {

    try {
        const res = await axios.put(`${baseUrl}/dash/categories/available/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 200) {
            console.log(res);
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