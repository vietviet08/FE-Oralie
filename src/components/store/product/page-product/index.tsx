import {getProductByCategoryAndBrand} from "@/services/ProductService";
import Pagination from "@/components/store/Pagination";
import MainPageTemplate from "@/components/store/product/page-product/main-page/main-page-template";
import FilterTemplate from "@/components/store/product/page-product/filter/filter-template";
import {searchParamsCacheProduct} from "@/lib/searchparam";
import { Suspense } from 'react';

// Add export const dynamic = 'force-dynamic' to force Next.js to re-render the page on each request
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export default async function PageProduct() {
    // Get all search parameters
    const search = searchParamsCacheProduct.get('search');
    const category = searchParamsCacheProduct.get('category');
    const brand = searchParamsCacheProduct.get('brand');
    const page = searchParamsCacheProduct.get('page') - 1;
    const size = searchParamsCacheProduct.get('size');
    const sortBy = searchParamsCacheProduct.get('sortBy');
    const sort = searchParamsCacheProduct.get('sort');
    const price = searchParamsCacheProduct.get('price');

    console.log("Rendering PageProduct with page:", page + 1);

    const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
    const formattedBrand = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : "";

    // Fetch products with proper parameters
    const data = await getProductByCategoryAndBrand(
        page, 
        size, 
        sortBy, 
        sort, 
        category || "", 
        brand, 
        price
    );
    
    const products = data.data || [];
    const totalProducts = data.totalElements || 0;

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    {formattedCategory && formattedBrand ?
                        `${formattedCategory}-${formattedBrand}` :
                        (formattedCategory || formattedBrand || "All Products")} ({totalProducts})
                </h1>
            </div>

            <FilterTemplate/>

            <Suspense fallback={<div className="py-10 text-center">Loading products...</div>}>
                {products.length > 0 ? (
                    <MainPageTemplate data={products}/>
                ) : (
                    <div className="py-20 text-center">
                        <h2 className="text-xl">No products found</h2>
                        <p className="text-gray-500 mt-2">Try adjusting your filters</p>
                    </div>
                )}
            </Suspense>

            {data.totalPages > 0 && (
                <Pagination listResponse={data}/>
            )}
        </div>
    );
}
