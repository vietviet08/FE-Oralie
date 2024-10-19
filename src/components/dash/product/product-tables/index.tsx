'use client';

import {
    CATEGORY_OPTIONS,
    useProductTableFilters
} from './use-product-table-filters';
import {columns} from './columns';
import {Product} from "@/model/product/Product";
import {DataTableSearch} from "@/components/dash/table/data-table-search";
import {DataTableFilterBox} from "@/components/dash/table/data-table-filter-box";
import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import {DataTable} from "@/components/dash/table/data-table";

export default function ProductTable({
                                         data,
                                         totalData
                                     }: {
    data: Product[];
    totalData: number;
}) {
    const {
        // categoriesFilter,
        // setCategoriesFilter,
        isAnyFilterActive,
        resetFilters,
        // searchQuery,
        // setPage,
        // setSearchQuery

        page,
        setPage,
        size,
        setSize,
        sortBy,
        setSortBy,
        sort,
        setSort,
        searchQuery,
        setSearchQuery,

    } = useProductTableFilters();

    return (
        <div className="space-y-4 ">
            <div className="flex flex-wrap items-center gap-4">
                <DataTableSearch
                    searchKey="name"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setPage={setPage}
                />
                {/*<DataTableFilterBox*/}
                {/*    filterKey="categories"*/}
                {/*    title="Categories"*/}
                {/*    options={CATEGORY_OPTIONS}*/}
                {/*    setFilterValue={setCategoriesFilter}*/}
                {/*    filterValue={categoriesFilter}*/}
                {/*/>*/}
                <DataTableResetFilter
                    isFilterActive={isAnyFilterActive}
                    onReset={resetFilters}
                />
            </div>
            <DataTable columns={columns} data={data} totalItems={totalData}/>
        </div>
    );
}
