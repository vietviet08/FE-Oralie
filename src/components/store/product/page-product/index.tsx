"use client";

import {ListResponse} from "@/model/ListData";
import {Product} from "@/model/product/Product";
import {Button} from "@/components/ui/button";
import React, {useEffect, useState} from "react";
import {Icons} from "@/components/icons";
import ProductCard from "@/components/store/product/product-card";
import {getProductByCategoryAndBrand} from "@/services/ProductService";
import FilterSection from "@/components/store/product/page-product/filter-section/filter-section";
import Pagination from "@/components/store/Pagination";
import {Brand} from "@/model/brand/Brand";
import {CategoryGet} from "@/model/category/CategoryGet";
import {getAllBrand} from "@/services/BrandService";
import { getAllCategoriesSameParentBySlug} from "@/services/CategoryService";
import Link from "next/link";
import Image from "next/image";

type Props = {
    listResponse: ListResponse<Product>;
    category: string;
    brand: string;
};

const PageProduct = ({listResponse, category, brand}: Props) => {
    const domainUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    const formattedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);

    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<CategoryGet[]>([]);

    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [pageIndex, setPageIndex] = useState(listResponse.pageNo);
    const [listProduct, setListProduct] = useState<ListResponse<Product>>(listResponse);

    const getCanPreviousPage = () => pageIndex > 0;
    const getCanNextPage = () => pageIndex < listProduct.totalPages - 1;
    const previousPage = () => setPageIndex((prev) => Math.max(prev - 1, 0));
    const nextPage = () => setPageIndex((prev) => Math.min(prev + 1, listProduct.totalPages - 1));

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await getProductByCategoryAndBrand(
                    pageIndex,
                    20,
                    sortBy,
                    sortOrder,
                    category,
                    brand || ''
                );
                setListProduct(res);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();

        async function fetchBrands() {
            try {
                const res = await getAllBrand();
                setBrands(res);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        }

        fetchBrands();

        async function fetchCategories() {
            try {
                const res = await getAllCategoriesSameParentBySlug(category);
                setCategories(res);
                console.log("fetch categories", res);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchCategories();

    }, [sortBy, pageIndex, sortOrder, category, brand]);

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <h1 className="text-2xl font-semibold">
                {formattedCategory && formattedBrand ?
                    `${formattedCategory}-${formattedBrand}` :
                    (formattedCategory || formattedBrand)} ({listProduct.totalElements})
            </h1>

            {/* Filter by price */}
            <div className="my-4 flex flex-col gap-4">
                {/* Filter by brand */}
                {brands.length > 0 && (
                    <FilterSection title="Brand">
                        {brands.map((brandItem, idx) => (
                            <Button key={idx} variant="outline" className="h-12 px-4">
                                <Link href={`/products?category=${category}&brand=${brandItem.slug}`}>
                                    <Image src={brandItem.image as string} alt={brandItem.name} width={56} height={32} className="w-full h-full"/>
                                </Link>
                            </Button>
                        ))}
                    </FilterSection>
                )}

                {/* Filter by category */}
                {categories.length > 0 && (
                    <FilterSection title="Category">
                        {categories.map((categoryItem, idx) => (
                            <Button key={idx} variant="outline" className="h-8 px-4">
                                <Link href={`/products?category=${categoryItem.slug}`}>
                                    <a>{categoryItem.name}</a>
                                </Link>
                            </Button>
                        ))}
                    </FilterSection>
                )}

                {/* Filter by price level */}
                <FilterSection title="Price level">
                    {[
                        "Under $500",
                        "$500 - $700",
                        "$700 - $1000",
                        "$1000 - $1500",
                        "$1500 - $2000",
                        "Over $2000",
                    ].map((label, idx) => (
                        <Button key={idx} variant="outline" className="h-8 px-4">
                            <a href={domainUrl}>{label}</a>
                        </Button>
                    ))}
                </FilterSection>

                {/* Sort by options */}
                <FilterSection title="Sort By">
                    <Button variant="outline" className="h-8 px-4" onClick={() => {
                        setSortOrder("asc");
                        setSortBy("id")
                    }}>
                        <Icons.clock className="text-gray-500" width={16} height={16}/>
                        <span className="text-base">Latest</span>
                    </Button>
                    <Button variant="outline" className="h-8 px-4" onClick={() => {
                        setSortOrder("desc");
                        setSortBy("price")
                    }}>
                        <Icons.arrowDownWideNarrow className="text-gray-500" width={16} height={16}/>
                        <span className="text-base">Price decrease</span>
                    </Button>
                    <Button variant="outline" className="h-8 px-4" onClick={() => {
                        setSortOrder("asc");
                        setSortBy("price")
                    }}>
                        <Icons.arrowUpWideNarrow className="text-gray-500" width={16} height={16}/>
                        <span className="text-base">Price increase</span>
                    </Button>
                    <Button variant="outline" className="h-8 px-4" onClick={() => {
                        setSortOrder("desc");
                        setSortBy("discount")
                    }}>
                        <Icons.flame className="text-gray-500" width={16} height={16}/>
                        <span className="text-base">Hot discount</span>
                    </Button>
                    <Button variant="outline" className="h-8 px-4">
                        <Icons.eye className="text-gray-500" width={16} height={16}/>
                        <span className="text-base">Most viewed</span>
                    </Button>
                </FilterSection>
            </div>

            {/* List products */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-2">
                {listProduct.data.map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={pageIndex + 1}
                totalPages={listProduct.totalPages}
                canPrevious={getCanPreviousPage()}
                canNext={getCanNextPage()}
                onFirstPage={() => setPageIndex(0)}
                onPreviousPage={previousPage}
                onNextPage={nextPage}
                onLastPage={() => setPageIndex(listProduct.totalPages - 1)}
            />
        </div>
    );
};

export default PageProduct;