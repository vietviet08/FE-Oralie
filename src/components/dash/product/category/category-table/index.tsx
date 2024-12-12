'use client';

import {
    useTableFilters
} from '../../use-table-filters';
import {columns} from './columns';
import {DataTableSearch} from "@/components/dash/table/data-table-search";
import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import {DataTable} from "@/components/dash/table/data-table";
import {CategoryGet} from "@/model/category/CategoryGet";

export default function CategoryTable({
                                         data,
                                         totalData
                                     }: {
    data: CategoryGet[];
    totalData: number;
}) {
    const {
        isAnyFilterActive,
        resetFilters,
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
    } = useTableFilters();

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
                {/*    filterKey="products"*/}
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
