import {getProductByCategoryAndBrand} from "@/services/ProductService";
import Pagination from "@/components/store/Pagination";
import MainPageTemplate from "@/components/store/product/page-product/main-page/main-page-template";
import FilterTemplate from "@/components/store/product/page-product/filter/filter-template";
import {searchParamsCacheProduct} from "@/lib/searchparam";

export default async function PageProduct() {

    // const search = searchParamsCacheProduct.get('search');
    const category = searchParamsCacheProduct.get('category');
    const brand = searchParamsCacheProduct.get('brand');
    const page = searchParamsCacheProduct.get('page') - 1;
    const size = searchParamsCacheProduct.get('size');
    const sortBy = searchParamsCacheProduct.get('sortBy');
    const sort = searchParamsCacheProduct.get('sort');

    const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";
    const formattedBrand = brand ? brand.charAt(0).toUpperCase() + brand.slice(1) : "";

    const data = await getProductByCategoryAndBrand(page, size, sortBy, sort, category || "", brand);
    const products = data.data;
    const totalProducts = data.totalElements;

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    {formattedCategory && formattedBrand ?
                        `${formattedCategory}-${formattedBrand}` :
                        (formattedCategory || formattedBrand)} ({totalProducts})
                </h1>
            </div>

            <FilterTemplate/>

            <MainPageTemplate data={products}/>

            <Pagination listResponse={data}/>
        </div>
    );
}
