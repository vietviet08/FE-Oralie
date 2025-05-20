import {FilterBoxProps} from "@/components/dash/table/data-table-filter-box";
import {Button} from "@/components/ui/button";
import React, {useCallback} from "react";
import Image from "next/image";
import {Icons} from "@/components/icons";
import {X} from "lucide-react";

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

    // Handle selection and deselection of a filter value
    const handleSelect = useCallback((value: string) => {
        if (!setFilterValue) return;
        
        const newSet = new Set(selectedValuesSet);
        if (newSet.has(value)) {
            // Deselect if already selected
            newSet.delete(value);
        } else {
            // Select if not already selected
            newSet.add(value);
        }

        // Convert set to dot-separated string, or null if empty
        const newValue = Array.from(newSet).join(".") || null;
        setFilterValue(newValue);
    }, [selectedValuesSet, setFilterValue]);

    // Reset all filters in this section
    const resetFilter = useCallback(() => {
        if (setFilterValue) {
            setFilterValue(null);
        }
    }, [setFilterValue]);

    // Check if a value is selected
    const isSelected = useCallback((value: string) => {
        return selectedValuesSet.has(value);
    }, [selectedValuesSet]);

    return (
        <div className="flex flex-col gap-2 justify-between items-start overflow-x-auto w-full">
            <div className="flex gap-3 items-center w-full justify-between">
                <div className="flex gap-2 items-center">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    
                    {selectedValuesSet.size > 0 && (
                        <Button
                            variant="outline"
                            onClick={resetFilter}
                            className="h-6 m-0 px-2 flex justify-center items-center text-center border border-primaryred text-primaryred rounded-2xl hover:bg-red-50"
                        >
                            <div className="flex items-center justify-between gap-1">
                                <span className="text-xs">Clear all</span>
                                <X className="w-3 h-3"/>
                            </div>
                        </Button>
                    )}
                </div>
                
                {/* Selected filter chips */}
                {selectedValuesSet.size > 0 && (
                    <div className="flex flex-wrap gap-2 justify-end">
                        {Array.from(selectedValuesSet).map((value) => {
                            const option = options?.find(opt => opt.value === value);
                            return (
                                <div 
                                    key={value}
                                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 border border-blue-300 rounded-full text-xs"
                                >
                                    {option?.label || value}
                                    <button 
                                        type="button"
                                        onClick={() => handleSelect(value)}
                                        aria-label={`Remove ${option?.label || value} filter`}
                                        className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-200 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <X className="w-2.5 h-2.5" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            <div className={className}>
                {children ? (
                    children
                ) : (
                    <>
                        {options?.map((option, idx) => {
                            const selected = isSelected(option.value);
                            
                            return (
                                <Button
                                    key={idx}
                                    type="button"
                                    variant={selected ? "default" : "outline"}
                                    className={`h-10 px-4 transition-all ${
                                        selected 
                                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300 hover:bg-blue-200" 
                                          : "hover:border-blue-200 hover:bg-blue-50"
                                    } ${option.image ? 'flex flex-col gap-1 items-center justify-center' : ''}`}
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {option.label && <span className={selected ? "font-semibold" : ""}>{option.label}</span>}
                                    {option.image && (
                                        <div className={`relative ${selected ? 'border-2 border-blue-300 rounded p-1' : ''}`}>
                                            <Image
                                                src={option.image as string}
                                                alt={option.label || "Brand image"}
                                                width={56}
                                                height={32}
                                                className="h-full object-contain"
                                            />
                                            {selected && (
                                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                                                    <Icons.check className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </Button>
                            );
                        })}
                    </>
                )}
            </div>
        </div>
    );
}