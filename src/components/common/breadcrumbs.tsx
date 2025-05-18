import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {Slash} from 'lucide-react';
import {Fragment} from 'react';

type BreadcrumbItemProps = {
    title: string;
    link: string;
};

export function Breadcrumbs({items}: { items: BreadcrumbItemProps[] }) {
    // For mobile views, we'll show only the current and previous item
    const displayItems = items.length > 2 
        ? [...items.slice(0, 1), ...items.slice(-2)] // First item, last two items
        : items;
    
    return (
        <Breadcrumb className="overflow-x-auto py-1 no-scrollbar">
            <BreadcrumbList className="flex-nowrap text-xs sm:text-sm">
                {/* For larger screens - show all items */}
                <div className="hidden sm:flex sm:items-center">
                    {items.map((item, index) => (
                        <Fragment key={item.title}>
                            {index !== items.length - 1 && (
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={item.link} className="text-sky-600 hover:underline truncate max-w-[120px] md:max-w-none">{item.title}</BreadcrumbLink>
                                </BreadcrumbItem>
                            )}
                            {index < items.length - 1 && (
                                <BreadcrumbSeparator>
                                    <Slash className="text-sky-600 h-3 w-3 sm:h-4 sm:w-4"/>
                                </BreadcrumbSeparator>
                            )}
                            {index === items.length - 1 && (
                                <BreadcrumbPage className="truncate max-w-[150px] md:max-w-none">{item.title}</BreadcrumbPage>
                            )}
                        </Fragment>
                    ))}
                </div>
                
                {/* For mobile screens - show condensed version */}
                <div className="flex sm:hidden items-center">
                    {displayItems.map((item, index) => {
                        // If we're showing a condensed version, add ellipsis after first item
                        const showEllipsis = items.length > 2 && index === 0 && index !== displayItems.length - 1;
                        
                        return (
                            <Fragment key={item.title}>
                                {index !== displayItems.length - 1 && (
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={item.link} className="text-sky-600 hover:underline truncate max-w-[80px]">{item.title}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                )}
                                {index < displayItems.length - 1 && (
                                    <BreadcrumbSeparator>
                                        {showEllipsis ? 
                                            <span className="text-sky-600 mx-1">...</span> : 
                                            <Slash className="text-sky-600 h-3 w-3"/>
                                        }
                                    </BreadcrumbSeparator>
                                )}
                                {index === displayItems.length - 1 && (
                                    <BreadcrumbPage className="truncate max-w-[120px]">{item.title}</BreadcrumbPage>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
