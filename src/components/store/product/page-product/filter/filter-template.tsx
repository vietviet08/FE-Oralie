"use client";

import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import FilterSection from "@/components/store/product/page-product/filter-section/filter-section";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {Brand} from "@/model/brand/Brand";
import {getAllBrand} from "@/services/BrandService";
import {getAllCategoriesSameParentBySlug} from "@/services/CategoryService";
import {useProductTableFilters} from "@/components/dash/product/product-tables/use-product-table-filters";
import {useCallback, useEffect, useState} from "react";
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
    
    // Enhanced function to handle filter updates
    const updateFiltersAndRefresh = useCallback(() => {
        // Reset to page 1 when filters change
        setPage(1);
        // Force router refresh to apply changes
        router.refresh();
    }, [router, setPage]);

    // Handle multiple brands (e.g., "dell.apple")
    const handleBrandSelection = useCallback((value: string | null) => {
        if (!value) {
            setBrand('');
            updateFiltersAndRefresh();
            return;
        }
        
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
        updateFiltersAndRefresh();
    }, [brand, setBrand, updateFiltersAndRefresh]);

    // Handle multiple price ranges (e.g., "700-1000.1000-1500")
    const handlePriceSelection = useCallback((value: string | null) => {
        if (!value) {
            setPrice('');
            updateFiltersAndRefresh();
            return;
        }
        
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
        updateFiltersAndRefresh();
    }, [price, setPrice, updateFiltersAndRefresh]);
    
    // Handle category selection
    const handleCategorySelection = useCallback((value: string | null) => {
        setCategory(value);
        updateFiltersAndRefresh();
    }, [setCategory, updateFiltersAndRefresh]);
    
    // Handle global reset
    const handleResetAllFilters = useCallback(() => {
        resetFilters();
        updateFiltersAndRefresh();
    }, [resetFilters, updateFiltersAndRefresh]);

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
    }, [category]);
    
    // Handle Sort Selection
    const handleSortSelection = useCallback((sortDirection: string, sortByField: string) => {
        setSort(sortDirection);
        setSortBy(sortByField);
        updateFiltersAndRefresh();
    }, [setSort, setSortBy, updateFiltersAndRefresh]);

    return (
        <div className="my-6 flex flex-col gap-6">
            {error && (
                <div className="bg-red-50 p-4 rounded-md flex items-center text-red-700 mb-4">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{error}</span>
                </div>
            )}

            {/* Global reset filter button */}
            {isAnyFilterActive && (
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium">Active filters</div>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleResetAllFilters}
                        className="text-xs"
                    >
                        Reset all filters
                    </Button>
                </div>
            )}

            {/* Filter by brand */}
            {!loading && brands.length > 0 && (
                <div className="p-4 border rounded-lg shadow-sm hover:shadow transition-shadow">
                    <FilterSection 
                        title="Brand"
                        className="grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 my-2"
                        options={brands.map((brandItem) => ({
                            label: brandItem.name || "",
                            value: brandItem?.slug?.toString() ?? "",
                            image: brandItem.image,
                        }))}
                        setFilterValue={handleBrandSelection}
                        filterValue={brand}
                    />
                </div>
            )}

            {/* Filter by category */}
            {!loading && categories.length > 0 && (
                <div className="p-4 border rounded-lg shadow-sm hover:shadow transition-shadow">
                    <FilterSection 
                        title="Category"
                        className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 my-2"
                        setFilterValue={handleCategorySelection}
                        filterValue={category}
                        options={categories.map((categoryItem) => ({
                            label: categoryItem.name ?? "",
                            value: categoryItem?.slug?.toString() ?? "",
                        }))}
                    />
                </div>
            )}

            {/* Filter by price level */}
            <div className="p-4 border rounded-lg shadow-sm hover:shadow transition-shadow">
                <FilterSection 
                    title="Price Range"
                    className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 my-2"
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
                />
            </div>

            {/* Sort by options - with a different style to distinguish from filters */}
            <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Sort By</h2>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <Button
                        variant={sort === 'desc' && sortBy === 'viewCount' ? "default" : "outline"}
                        className={`h-10 ${sort === 'desc' && sortBy === 'viewCount' 
                            ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300 hover:bg-indigo-200' 
                            : 'hover:border-indigo-200 hover:bg-indigo-50'}`}
                        onClick={() => handleSortSelection("desc", "viewCount")}>
                        <Icons.eye className={sort === 'desc' && sortBy === 'viewCount' ? "text-indigo-600" : "text-gray-500"} width={16} height={16}/>
                        <span className="ml-2">Most viewed</span>
                    </Button>
                    <Button
                        variant={sort === 'desc' && sortBy === 'id' ? "default" : "outline"}
                        className={`h-10 ${sort === 'desc' && sortBy === 'id' 
                            ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300 hover:bg-indigo-200' 
                            : 'hover:border-indigo-200 hover:bg-indigo-50'}`}
                        onClick={() => handleSortSelection("desc", "id")}>
                        <Icons.clock className={sort === 'desc' && sortBy === 'id' ? "text-indigo-600" : "text-gray-500"} width={16} height={16}/>
                        <span className="ml-2">Latest</span>
                    </Button>
                    <Button
                        variant={sort === 'desc' && sortBy === 'price' ? "default" : "outline"}
                        className={`h-10 ${sort === 'desc' && sortBy === 'price' 
                            ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300 hover:bg-indigo-200' 
                            : 'hover:border-indigo-200 hover:bg-indigo-50'}`}
                        onClick={() => handleSortSelection("desc", "price")}>
                        <Icons.arrowDownWideNarrow className={sort === 'desc' && sortBy === 'price' ? "text-indigo-600" : "text-gray-500"} width={16} height={16}/>
                        <span className="ml-2">Price decrease</span>
                    </Button>
                    <Button
                        variant={sort === 'asc' && sortBy === 'price' ? "default" : "outline"}
                        className={`h-10 ${sort === 'asc' && sortBy === 'price' 
                            ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300 hover:bg-indigo-200' 
                            : 'hover:border-indigo-200 hover:bg-indigo-50'}`}
                        onClick={() => handleSortSelection("asc", "price")}>
                        <Icons.arrowUpWideNarrow className={sort === 'asc' && sortBy === 'price' ? "text-indigo-600" : "text-gray-500"} width={16} height={16}/>
                        <span className="ml-2">Price increase</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FilterTemplate;