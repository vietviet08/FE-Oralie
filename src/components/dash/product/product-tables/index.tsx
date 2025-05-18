"use client";

import {useProductTableFilters} from "./use-product-table-filters";
import {columns} from "./columns";
import {Product} from "@/model/product/Product";
import {DataTableSearch} from "@/components/dash/table/data-table-search";
import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import {DataTable} from "@/components/dash/table/data-table";
import {DataTableFilterBox} from "@/components/dash/table/data-table-filter-box";
import {useEffect, useState} from "react";
import {getAllCategoriesNotId} from "@/services/CategoryService";
import {CategoryGet} from "@/model/category/CategoryGet";

export default function ProductTable({data, totalData}: { data: Product[]; totalData: number }) {

    const {
        resetFilters,
        isAnyFilterActive,
        search,
        setSearch,
        setPage,
        category,
        setCategory,
        // page,
        // size,
        // setSize,
        // sortBy,
        // setSortBy,
        // sort,
        // setSort,
    } = useProductTableFilters();

    const [categories, setCategories] = useState<CategoryGet[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const res = await getAllCategoriesNotId(0, false);
            setCategories(res);
        }

        fetchCategories();
    }, []);

    return (
        <div className="space-y-4 ">
            <div className="flex flex-wrap items-center gap-4">
                <DataTableSearch
                    searchKey="name"
                    searchQuery={search}
                    setSearchQuery={setSearch}
                    setPage={setPage}
                />
                <DataTableFilterBox
                    filterKey="products"
                    title="Categories"
                    options={categories.map((categoryItem) => ({
                        label: categoryItem.name ?? "",
                        value: categoryItem?.slug?.toString() ?? "",
                    }))}
                    setFilterValue={setCategory}
                    filterValue={category}
                />
                <DataTableResetFilter
                    isFilterActive={isAnyFilterActive}
                    onReset={resetFilters}
                />
            </div>
            <DataTable columns={columns} data={data} totalItems={totalData}/>
        </div>
    );
}
