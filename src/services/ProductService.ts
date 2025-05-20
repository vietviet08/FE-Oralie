import {ProductPost} from "@/model/product/ProductPost";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';
// const testUrl = testUrlProductService;

// export async function getProducts(page: number,
//                                   size: number,
//                                   sortBy: string,
//                                   sort: string,
//                                   search: string,
//                                   category: string): Promise<ProductPage> {
//     const url = `page=${page}&size=${size}&sortBy=${sortBy}&sort=${sort}&search=${search}&category=${category}`;
//     const response = await apiClientService.get(`${baseUrl}/store/products?${url}`);
//     return response.json();
// }

export async function getListProduct(page: number,
                                     size: number,
                                     sortBy: string,
                                     sort: string,
                                     search: string,
                                     category: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/products`, {
            params: {
                page,
                size,
                sortBy,
                sort,
                search,
                category,
            },
        });
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTop10ProductRelatedCategory(productId: number, categoryName: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/products/top10/${productId}?categoryName=${categoryName}`);
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTop12ProductByCategorySlug(categorySlug: string) {
    try {
        const res = await axios.get(`${baseUrl}/store/products/top12?categorySlug=${categorySlug}`);
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductOptionsByProductId(productId: number) {
    try {
        const res = await axios.get(`${baseUrl}/store/products/options/${productId}`);
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductByCategoryAndBrand(page: number,
                                                   size: number,
                                                   sortBy: string,
                                                   sort: string,
                                                   category: string,
                                                   brand?: string,
                                                   price?: string) {
    try {
        // Request parameters
        const params: any = {
            page,
            size,
            sortBy,
            sort,
            category
        };
        
        // Add brand if provided (API accepts comma-separated values)
        if (brand) {
            params.brand = brand;
        }
        
        // Add price if provided
        if (price) {
            params.price = price;
        }
        
        console.log("Calling API with params:", JSON.stringify(params));
        
        const res = await axios.get(`${baseUrl}/store/categories`, {params});
        if (res && res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("Error in getProductByCategoryAndBrand:", error);
        // Return default structure to prevent UI from breaking
        return {
            data: [],
            totalElements: 0,
            totalPages: 0,
            pageNo: 0,
            lastPage: false,
            pageSize: 10,
            isLast: true
        };
    }
}

export async function getProductById(id: number) {

    try {
        const res = await axios.get(`${baseUrl}/store/products/id/${id}`);
        if (res && res.status === 200) {
            return res.data;
        } else if (res.status === 404) {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getProductBySlug(slug: string) {

    try {
        const res = await axios.get(`${baseUrl}/store/products/${slug}`);
        if (res && res.status === 200) {
            return res.data;
        } else if (res.status === 404) {
            return null;
        }
    } catch (error) {
        console.log(error);
        //  throw error;
    }
}

//dash for manage

// export async function createProduct(product: ProductPost): Promise<Product> {
//     const response = await apiClientService.post(`${baseUrl}/dash/products`, JSON.stringify(product));
//     return response.json();
// }

export async function createProduct(product: ProductPost, token: string) {
    try {
        const formData = new FormData();

        formData.append('name', product.name ?? '');
        formData.append('slug', product.slug ?? '');
        formData.append('description', product.description ?? '');
        formData.append('sku', product.sku ?? '');
        formData.append('price', product.price.toString());
        formData.append('discount', product.discount?.toString() || '0');
        formData.append('quantity', product.quantity.toString());
        formData.append('isDiscounted', product.isDiscounted?.toString() ?? 'false');
        formData.append('isAvailable', product.isAvailable?.toString() ?? 'false');
        formData.append('isDeleted', product.isDeleted?.toString() ?? 'false');
        formData.append('isFeatured', product.isFeatured?.toString() ?? 'false');

        product.categoryIds?.forEach((id, index) => {
            formData.append(`categoryIds[${index}]`, id.toString());
        });

        formData.append('brandId', product.brandId?.toString() ?? '');

        product.images?.forEach((image) => {
            formData.append(`images`, image);
        });

        product.options?.forEach((option, index) => {
            formData.append(`options[${index}].name`, option.name);
            formData.append(`options[${index}].value`, option.value);
        });

        product.specifications?.forEach((specification, index) => {
            formData.append(`specifications[${index}].name`, specification.name);
            formData.append(`specifications[${index}].value`, specification.value);
        });

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        // const test = `${testUrl}/dash/products`;
        const mainUrl = `${baseUrl}/dash/products`;

        const res = await axios.post(mainUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        if (res && res.status === 200) {
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


export async function updateProduct(id: number, product: ProductPost, token: string) {
    try {
        const formData = new FormData();

        formData.append('name', product.name ?? '');
        formData.append('slug', product.slug ?? '');
        formData.append('description', product.description ?? '');
        formData.append('sku', product.sku ?? '');
        formData.append('price', product.price.toString());
        formData.append('discount', product.discount?.toString() || '0');
        formData.append('quantity', product.quantity.toString());
        formData.append('isDiscounted', product.isDiscounted?.toString() ?? 'false');
        formData.append('isAvailable', product.isAvailable?.toString() ?? 'false');
        formData.append('isDeleted', product.isDeleted?.toString() ?? 'false');
        formData.append('isFeatured', product.isFeatured?.toString() ?? 'false');
        formData.append('isPromoted', product.isPromoted?.toString() ?? 'false');

        product.categoryIds?.forEach((id, index) => {
            formData.append(`categoryIds[${index}]`, id.toString());
        });

        formData.append('brandId', product.brandId?.toString() ?? '');

        product.images?.forEach((image) => {
            formData.append(`images`, image);
        });

        // Handle deleted image URLs
        product.deletedImageUrls?.forEach((url, index) => {
            formData.append(`deletedImageUrls[${index}]`, url);
        });

        // Handle existing image URLs that are being kept
        product.existingImageUrls?.forEach((url, index) => {
            formData.append(`existingImageUrls[${index}]`, url);
        });

        product.options?.forEach((option, index) => {
            formData.append(`options[${index}].name`, option.name);
            formData.append(`options[${index}].value`, option.value);
        });

        product.specifications?.forEach((specification, index) => {
            formData.append(`specifications[${index}].name`, specification.name);
            formData.append(`specifications[${index}].value`, specification.value);
        });

        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });

        const mainUrl = `${baseUrl}/dash/products/${id}`;
        const res = await axios.put(mainUrl, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (res && res.status === 200) {
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateAvailabelProduct(id: number, token: string) {
    try {
        const res = await axios.put(`${baseUrl}/dash/products/available/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 200) {
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function deleteProduct(id: number, token: string) {
    try {
        const res = await axios.delete(`${baseUrl}/dash/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res && res.status === 204) {
            return res;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

