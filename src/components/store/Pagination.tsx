"use client";

import {Button} from "@/components/ui/button";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {useState} from "react";
import {ListResponse} from "@/model/ListData";

function Pagination({listResponse  } :{listResponse: ListResponse<unknown>}){

    const [pageIndex, setPageIndex] = useState(listResponse.pageNo);

    const getCanPreviousPage = () => pageIndex > 0;
    const getCanNextPage = () => pageIndex < listResponse.totalPages - 1;
    const previousPage = () => setPageIndex((prev) => Math.max(prev - 1, 0));
    const nextPage = () => setPageIndex((prev) => Math.min(prev + 1, listResponse.totalPages - 1));

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
                    onClick={() => setPageIndex(0)}
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
                    onClick={() => setPageIndex(listResponse.totalPages - 1)}
                    disabled={!getCanNextPage()}
                >
                    <DoubleArrowRightIcon className="h-6 w-6" aria-hidden="true"/>
                </Button>
            </div>
        </div>
    );
}

export default Pagination;