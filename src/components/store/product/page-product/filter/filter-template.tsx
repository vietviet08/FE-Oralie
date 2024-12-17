"use client";

import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import FilterSection from "@/components/store/product/page-product/filter-section/filter-section";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {Brand} from "@/model/brand/Brand";
import {getAllBrand} from "@/services/BrandService";
import {getAllCategoriesSameParentBySlug} from "@/services/CategoryService";
import {useProductTableFilters} from "@/components/dash/product/product-tables/use-product-table-filters";
import {useEffect, useState} from "react";
import {CategoryGet} from "@/model/category/CategoryGet";

function FilterTemplate() {

    const {
        resetFilters,
        isAnyFilterActive,
        category,
        setCategory,
        brand,
        setBrand,
        price,
        setPrice,
        // page,
        // size,
        // setSize,
        // sortBy,
        setSortBy,
        // sort,
        setSort,
    } = useProductTableFilters();

    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<CategoryGet[]>([]);

    useEffect(() => {
        async function fetchBrandsAndCategories() {
            try {
                const [brandRes, categoriesRes] = await Promise.all([
                    brand && getAllBrand(),
                    getAllCategoriesSameParentBySlug(category),
                ]);
                console.log("brands", brandRes);
                console.log("categories", categoriesRes);
                setBrands(brandRes);
                setCategories(categoriesRes);
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }
        fetchBrandsAndCategories();
    }, [category, brand]);


    return (
        <div className="my-4 flex flex-col gap-4">
            {/*<DataTableSearch*/}
            {/*    searchKey="search"*/}
            {/*    searchQuery={search}*/}
            {/*    setSearchQuery={setSearch}*/}
            {/*    setPage={setPage}*/}
            {/*/>*/}

            {/*delete filter */}
            <DataTableResetFilter
                isFilterActive={isAnyFilterActive}
                onReset={resetFilters}
            />

            {/*Filter by brand*/}
            {brands.length > 0 && (
                <FilterSection title="Brand"
                               className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 my-2"
                               options={brands.map((brandItem) => ({
                                      label: "",
                                   value: brandItem?.slug?.toString() ?? "",
                                   image: brandItem.image,
                               }))}
                               setFilterValue={setBrand}
                               filterValue={brand}
                >
                </FilterSection>
            )}

            {/* Filter by category */}
            {categories && (
                <FilterSection title="Category"
                               className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 my-2"
                               setFilterValue={setCategory}
                               filterValue={category}
                               options={categories.map((categoryItem) => ({
                                   label: categoryItem.name ?? "",
                                   value: categoryItem?.slug?.toString() ?? "",
                               }))}
                >
                </FilterSection>
            )}

            {/* Filter by price level */}
            <FilterSection title="Price level"
                           className="grid grid-cols-3 gap-2 md:grid-cols-5 lg:grid-cols-8 my-2"
                           setFilterValue={setPrice}
                           filterValue={price}
                           options={[
                               {label: "Under $500", value: "0-500"},
                               {label: "$500 - $700", value: "500-700"},
                               {label: "$700 - $1000", value: "700-1000"},
                               {label: "$1000 - $1500", value: "1000-1500"},
                               {label: "$1500 - $2000", value: "1500-2000"},
                               {label: "Over $2000", value: "2000-9999999"},
                           ]}

            >
            </FilterSection>

            {/* Sort by options */}
            <FilterSection title="Sort By" className="grid grid-cols-2 gap-2 lg:grid-cols-6  my-2">
                <Button variant="outline" className="h-8 px-4">
                    <Icons.eye className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Most viewed</span>
                </Button>
                <Button variant="outline" className="h-10 px-4" onClick={() => {
                    setSort("asc");
                    setSortBy("id")
                }}>
                    <Icons.clock className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Latest</span>
                </Button>
                <Button variant="outline" className="h-8 px-4" onClick={() => {
                    setSort("desc");
                    setSort("price")
                }}>
                    <Icons.arrowDownWideNarrow className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Price decrease</span>
                </Button>
                <Button variant="outline" className="h-8 px-4" onClick={() => {
                    setSort("asc");
                    setSortBy("price")
                }}>
                    <Icons.arrowUpWideNarrow className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Price increase</span>
                </Button>
                <Button variant="outline" className="h-8 px-4" onClick={() => {
                    setSort("desc");
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
    )
}

export default FilterTemplate;