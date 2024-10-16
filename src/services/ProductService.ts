import apiClientService from "@/utils/ApiClientService";
import {ProductPage} from "@/model/product/ProductPage";
import {ProductPost} from "@/model/product/ProductPost";
import {Product} from "@/model/product/Product";

const baseUrl = process.env.NEXT_PUBLIC_API_URL + '/api/products';

export async function getProducts(page: number,
                                  size: number,
                                  sortBy: string,
                                  sort: string): Promise<ProductPage> {
    const url = `page=${page}&size=${size}&sortBy=${sortBy}&sort=${sort}`;
    const response = await apiClientService.get(`${baseUrl}/store/products?${url}`);
    return response.json();
}

export async function getProductByCategoryAndBrand(page: number,
                                                   size: number,
                                                   sortBy: string,
                                                   sort: string,
                                                   category: string,
                                                   brand: string): Promise<ProductPage> {
    const url = `page=${page}&size=${size}&sortBy=${sortBy}&sort=${sort}&categoryName=${category}&brandName=${brand}`;
    const response = await apiClientService.get(`${baseUrl}/store/categories?${url}`);
    return response.json();
}

export async function getProductById(id: number): Promise<Product> {
    const response = await apiClientService.get(`${baseUrl}/store/products/${id}`);
    return response.json();
}

export async function getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClientService.get(`${baseUrl}/store/products/${slug}`);
    return response.json();
}


//dash for manage
export async function createProduct(product: ProductPost): Promise<Product> {
    const response = await apiClientService.post(`${baseUrl}/dash/products`, JSON.stringify(product));
    return response.json();
}

export async function updateProduct(id: number, product: Product): Promise<Product> {
    const response = await apiClientService.put(`${baseUrl}/dash/products/${id}`, JSON.stringify(product));
    return response.json();
}

export async function deleteProduct(id: number) {
    const response = await apiClientService.delete(`${baseUrl}/dash/products/${id}`);
    return response;
}

