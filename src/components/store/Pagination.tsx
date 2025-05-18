"use client";

import {Button} from "@/components/ui/button";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {ListResponse} from "@/model/ListData";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useProductTableFilters} from "@/components/dash/product/product-tables/use-product-table-filters";

function Pagination({listResponse  } :{listResponse: ListResponse<unknown>}){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const {setPage} = useProductTableFilters();
    const [pageIndex, setPageIndex] = useState(listResponse.pageNo);

    // Update the pageIndex when listResponse.pageNo changes
    useEffect(() => {
        setPageIndex(listResponse.pageNo);
    }, [listResponse.pageNo]);

    const getCanPreviousPage = () => pageIndex > 0;
    const getCanNextPage = () => pageIndex < listResponse.totalPages - 1;
    
    // This function forces a full page reload with the new page parameter
    const changePage = (newPageIndex: number) => {
        const newPage = newPageIndex + 1; // Add 1 because API expects 1-based indexing
        
        // Create a new URLSearchParams object
        const newParams = new URLSearchParams();
        
        // Copy all existing params except page
        searchParams.forEach((value, key) => {
            if (key !== 'page') {
                newParams.set(key, value);
            }
        });
        
        // Set the new page
        newParams.set('page', newPage.toString());
        
        // Force a full page reload to ensure fresh data
        window.location.href = `${pathname}?${newParams.toString()}`;
    };
    
    const previousPage = () => {
        if (getCanPreviousPage()) {
            changePage(pageIndex - 1);
        }
    };
    
    const nextPage = () => {
        if (getCanNextPage()) {
            changePage(pageIndex + 1);
        }
    };

    return (
        <div className="flex w-full items-center justify-between gap-2 sm:justify-center mt-8">
            <div className="flex w-[150px] items-center justify-center text-sm font-medium">
                {listResponse.totalPages > 0 ? `Page ${pageIndex + 1} of ${listResponse.totalPages}` : "No pages"}
            </div>
            <div className="flex items-center space-x-4">
                <Button
                    aria-label="Go to first page"
                    variant="outline"
                    className="hidden h-10 w-10 p-0 lg:flex"
                    onClick={() => changePage(0)}
                    disabled={!getCanPreviousPage()}
                >
                    <DoubleArrowLeftIcon className="h-6 w-6" aria-hidden="true"/>
                </Button>
                <Button
                    aria-label="Go to previous page"
                    variant="outline"
                    className="h-10 w-10 p-0"
                    onClick={previousPage}
                    disabled={!getCanPreviousPage()}
                >
                    <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/>
                </Button>
                <Button
                    aria-label="Go to next page"
                    variant="outline"
                    className="h-10 w-10 p-0"
                    onClick={nextPage}
                    disabled={!getCanNextPage()}
                >
                    <ChevronRightIcon className="h-6 w-6" aria-hidden="true"/>
                </Button>
                <Button
                    aria-label="Go to last page"
                    variant="outline"
                    className="hidden h-10 w-10 p-0 lg:flex"
                    onClick={() => changePage(listResponse.totalPages - 1)}
                    disabled={!getCanNextPage()}
                >
                    <DoubleArrowRightIcon className="h-6 w-6" aria-hidden="true"/>
                </Button>
            </div>
        </div>
    );
}

export default Pagination;