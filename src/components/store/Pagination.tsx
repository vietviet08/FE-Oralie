import { Button } from "@/components/ui/button";
import {DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

const Pagination = ({
                        currentPage,
                        totalPages,
                        canPrevious,
                        canNext,
                        onFirstPage,
                        onPreviousPage,
                        onNextPage,
                        onLastPage,
                    }: {
    currentPage: number;
    totalPages: number;
    canPrevious: boolean;
    canNext: boolean;
    onFirstPage: () => void;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onLastPage: () => void;
}) => (
    <div className="flex w-full items-center justify-between gap-2 sm:justify-center mt-8">
        <div className="flex w-[150px] items-center justify-center text-sm font-medium">
            {totalPages > 0 ? `Page ${currentPage} of ${totalPages}` : "No pages"}
        </div>
        <div className="flex items-center space-x-4">
            <Button
                aria-label="Go to first page"
                variant="outline"
                className="hidden h-10 w-10 p-0 lg:flex"
                onClick={onFirstPage}
                disabled={!canPrevious}
            >
                <DoubleArrowLeftIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button
                aria-label="Go to previous page"
                variant="outline"
                className="h-10 w-10 p-0"
                onClick={onPreviousPage}
                disabled={!canPrevious}
            >
                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button
                aria-label="Go to next page"
                variant="outline"
                className="h-10 w-10 p-0"
                onClick={onNextPage}
                disabled={!canNext}
            >
                <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
            <Button
                aria-label="Go to last page"
                variant="outline"
                className="hidden h-10 w-10 p-0 lg:flex"
                onClick={onLastPage}
                disabled={!canNext}
            >
                <DoubleArrowRightIcon className="h-6 w-6" aria-hidden="true" />
            </Button>
        </div>
    </div>
);

export default Pagination;