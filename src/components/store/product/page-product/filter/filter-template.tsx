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
import {useRouter} from "next/navigation";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Extend FilterOption to include selected property
interface ExtendedFilterOption {
    label: string;
    value: string;
    image?: string;
    selected?: boolean;
}

function FilterTemplate() {
    const router = useRouter();

    const {
        resetFilters,
        isAnyFilterActive,
        category,
        setCategory,
        brand,
        setBrand,
        price,
        setPrice,
        page,
        setPage,
        size,
        sortBy,
        setSortBy,
        sort,
        setSort,
    } = useProductTableFilters();

    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<CategoryGet[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle multiple brands (e.g., "dell.apple")
    const handleBrandSelection = (value: string | null) => {
        if (!value) return;
        
        // If the brand already contains the selected value, remove it
        if (brand && brand.includes(value)) {
            const brands = brand.split('.').filter(b => b !== value);
            setBrand(brands.length > 0 ? brands.join('.') : '');
        } 
        // If brand is empty, just set it
        else if (!brand) {
            setBrand(value);
        } 
        // Otherwise add the selected brand to existing (separated by dot)
        else {
            setBrand(`${brand}.${value}`);
        }
        router.refresh();
    };

    // Handle multiple price ranges (e.g., "700-1000.1000-1500")
    const handlePriceSelection = (value: string | null) => {
        if (!value) return;
        
        // If the price already contains the selected value, remove it
        if (price && price.includes(value)) {
            const prices = price.split('.').filter(p => p !== value);
            setPrice(prices.length > 0 ? prices.join('.') : '');
        } 
        // If price is empty, just set it
        else if (!price) {
            setPrice(value);
        } 
        // Otherwise add the selected price to existing (separated by dot)
        else {
            setPrice(`${price}.${value}`);
        }
        router.refresh();
    };

    useEffect(() => {
        async function fetchBrandsAndCategories() {
            setLoading(true);
            setError(null);
            
            try {
                // Fetch brands 
                const brandRes = await getAllBrand();
                if (brandRes && Array.isArray(brandRes)) {
                    console.log("brands", brandRes);
                    setBrands(brandRes);
                }
                
                // Fetch categories only if we have a valid category parameter
                if (category && category.trim() !== '') {
                    try {
                        const categoriesRes = await getAllCategoriesSameParentBySlug(category);
                        if (categoriesRes && Array.isArray(categoriesRes)) {
                            console.log("categories", categoriesRes);
                            setCategories(categoriesRes);
                        }
                    } catch (categoryError) {
                        console.error("Error fetching categories:", categoryError);
                        // Show a toast notification for category error
                        toast.error("Failed to load related categories. The selected category may not have a parent category.");
                        setCategories([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load filter data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchBrandsAndCategories();
    }, [category, brand]);
    
    // Reset page to 1 when filters change
    useEffect(() => {
        setPage(1);
    }, [category, brand, price, setPage]);

    // Check if a brand is selected (for UI highlighting)
    const isBrandSelected = (value: string) => {
        if (!brand) return false;
        return brand.split('.').includes(value);
    };

    // Check if a price range is selected (for UI highlighting)
    const isPriceSelected = (value: string) => {
        if (!price) return false;
        return price.split('.').includes(value);
    };

    return (
        <div className="my-4 flex flex-col gap-4">
            {error && (
                <div className="bg-red-50 p-4 rounded-md flex items-center text-red-700 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                </div>
            )}

            {/*delete filter */}
            <DataTableResetFilter
                isFilterActive={isAnyFilterActive}
                onReset={() => {
                    resetFilters();
                    router.refresh();
                }}
            />

            {/*Filter by brand*/}
            {!loading && brands.length > 0 && (
                <FilterSection title="Brand"
                               className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 my-2"
                               options={brands.map((brandItem) => ({
                                      label: "",
                                      value: brandItem?.slug?.toString() ?? "",
                                      image: brandItem.image,
                               }))}
                               setFilterValue={handleBrandSelection}
                               filterValue={brand}
                >
                </FilterSection>
            )}

            {/* Filter by category */}
            {!loading && categories.length > 0 && (
                <FilterSection title="Category"
                               className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 my-2"
                               setFilterValue={(value) => {
                                   setCategory(value);
                                   router.refresh();
                               }}
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
                           setFilterValue={handlePriceSelection}
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
            <FilterSection title="Sort By" className="grid grid-cols-2 gap-2 lg:grid-cols-6 my-2">
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'desc' && sortBy === 'viewCount' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("desc");
                            setSortBy("viewCount");
                            router.refresh();
                        }}>
                    <Icons.eye className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Most viewed</span>
                </Button>
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'desc' && sortBy === 'id' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("desc");
                            setSortBy("id");
                            router.refresh();
                        }}>
                    <Icons.clock className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Latest</span>
                </Button>
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'desc' && sortBy === 'price' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("desc");
                            setSortBy("price");
                            router.refresh();
                        }}>
                    <Icons.arrowDownWideNarrow className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Price decrease</span>
                </Button>
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'asc' && sortBy === 'price' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("asc");
                            setSortBy("price");
                            router.refresh();
                        }}>
                    <Icons.arrowUpWideNarrow className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Price increase</span>
                </Button>
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'desc' && sortBy === 'discount' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("desc");
                            setSortBy("discount");
                            router.refresh();
                        }}>
                    <Icons.flame className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Hot discount</span>
                </Button>
                <Button variant="outline" 
                        className={`h-8 px-4 ${sort === 'desc' && sortBy === 'salesCount' ? 'bg-gray-200' : ''}`}
                        onClick={() => {
                            setSort("desc");
                            setSortBy("salesCount");
                            router.refresh();
                        }}>
                    <Icons.star className="text-gray-500" width={16} height={16}/>
                    <span className="text-base">Best sellers</span>
                </Button>
            </FilterSection>
        </div>
    )
}

export default FilterTemplate;