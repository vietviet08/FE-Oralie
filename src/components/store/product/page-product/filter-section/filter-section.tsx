import {FilterBoxProps} from "@/components/dash/table/data-table-filter-box";
import {Button} from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import {Icons} from "@/components/icons";

interface FilterSectionProps {
    title?: string;
    options?: FilterBoxProps["options"];
    setFilterValue?: (value: string | null) => void;
    filterValue?: FilterBoxProps["filterValue"];
    children?: React.ReactNode;
    className?: string;
}

export default function FilterSection({
                                          title,
                                          options,
                                          setFilterValue,
                                          filterValue,
                                          children,
                                          className,
                                      }: FilterSectionProps) {

    const selectedValuesSet = React.useMemo(() => {
        if (!filterValue) {
            return new Set<string>();
        }
        try {
            const values = filterValue.split(".").filter(Boolean);
            return new Set(values);
        } catch (error) {
            console.error("Error splitting filterValue:", error);
            return new Set<string>();
        }
    }, [filterValue]);

    const handleSelect = (value: string) => {
        if (!setFilterValue) return;
        const newSet = new Set(selectedValuesSet);
        if (newSet.has(value)) {
            newSet.delete(value);
        } else {
            newSet.add(value);
        }

        const newValue = Array.from(newSet).join(".") || null;
        setFilterValue(newValue);
    };

    const resetFilter = () => {
        if (setFilterValue) {
            setFilterValue(null);
        }
    };

    return (
        <div className="flex flex-col gap-2 justify-between items-start overflow-x-auto">
            <div className="flex gap-3 items-center">
                <div>
                    <h2 className="text-lg font-semibold">{title}</h2>
                </div>
                {selectedValuesSet.size > 0 && (
                    <Button

                        variant="outline"
                        onClick={resetFilter}
                        className="h-5 m-0 p-0 px-2 flex justify-center items-center text-center border border-primaryred text-primaryred rounded-2xl"
                    >
                        <div className="flex items-center justify-between">
                            <span>Clear</span>
                            <Icons.close className="w-1 h-1 ml-2"/>
                        </div>
                    </Button>
                )}
            </div>
            <div className={className}>
                {children ? (
                    children
                ) : (
                    <>
                        {options?.map((option, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                className="h-10 px-4"
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                                {option.image && (
                                    <Image
                                        src={option.image as string}
                                        alt={option.label}
                                        width={56}
                                        height={32}
                                        className="h-full object-contain"
                                    />
                                )}
                            </Button>
                        ))}

                    </>
                )}
            </div>

        </div>
    );
}