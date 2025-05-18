'use client';

import {columns} from './columns';
import {DataTableSearch} from "@/components/dash/table/data-table-search";
import {DataTableResetFilter} from "@/components/dash/table/data-table-reset-filter";
import {DataTable} from "@/components/dash/table/data-table";
import {useTableFilters} from "@/components/dash/product/use-table-filters";
import {Brand} from "@/model/brand/Brand";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {exportBrand} from "@/services/BrandService";
import {useSession} from "next-auth/react";

export default function BrandTable({
                                         data,
                                         totalData
                                     }: {
    data: Brand[];
    totalData: number;
}) {
    const {
        isAnyFilterActive,
        resetFilters,
        // page,
        setPage,
        // size,
        // setSize,
        // sortBy,
        // setSortBy,
        // sort,
        // setSort,
        searchQuery,
        setSearchQuery,

    } = useTableFilters();

    const {data: session} = useSession();
    const token = session?.access_token as string;

    const handleExportBrand = async ()  => {
        await exportBrand(token);
    }

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
            <Button variant={'secondary'} className="text-xs md:text-sm" onClick={handleExportBrand}>
                <Plus className="mr-2 h-4 w-4"/> Export
            </Button>
            <DataTable columns={columns} data={data} totalItems={totalData}/>
        </div>
    );
}
