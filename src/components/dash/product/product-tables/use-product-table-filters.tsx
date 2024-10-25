'use client';

import {searchParamsProduct} from '@/lib/searchparam';
import {useQueryState} from 'nuqs';
import {useCallback, useMemo} from 'react';

export const CATEGORY_OPTIONS = [
    {value: 'Electronics', label: 'Electronics'},
    {value: 'Furniture', label: 'Furniture'},
    {value: 'Clothing', label: 'Clothing'},
    {value: 'Toys', label: 'Toys'},
    {value: 'Groceries', label: 'Groceries'},
    {value: 'Books', label: 'Books'},
    {value: 'Jewelry', label: 'Jewelry'},
    {value: 'Beauty Products', label: 'Beauty Products'}
];

export function useProductTableFilters() {
    const [searchQuery, setSearchQuery] = useQueryState(
        'search',
        searchParamsProduct.search
            .withOptions({shallow: false, throttleMs: 1000})
            .withDefault('')
    );

    // const [categoriesFilter, setCategoriesFilter] = useQueryState(
    //     'categories',
    //     searchParams.categories.withOptions({shallow: false}).withDefault('')
    // );

    const [page, setPage] = useQueryState(
        'page',
        searchParamsProduct.page.withDefault(1)
    );

    const [size, setSize] = useQueryState(
        'size',
        searchParamsProduct.size.withDefault(10)
    );

    const [sortBy, setSortBy] = useQueryState(
        'sortBy',
        searchParamsProduct.sortBy.withDefault('id')
    );

    const [sort, setSort] = useQueryState(
        'sort',
        searchParamsProduct.sort.withDefault('asc')
    );

    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSortBy('id');
        setSort('asc');
        setSize(10);
        setPage(0);
        // setCategoriesFilter(null);
    }, [setSearchQuery, setPage, setSize, setSortBy, setSort]);

    // const isAnyFilterActive = useMemo(() => {
    //     return !!searchQuery || !!categoriesFilter;
    // }, [searchQuery, categoriesFilter]);
    const isAnyFilterActive = useMemo(() => {
            return !!searchQuery ;
        }, [searchQuery]);


    return {
        searchQuery,
        setSearchQuery,
        page,
        setPage,
        size,
        setSize,
        sortBy,
        setSortBy,
        sort,
        setSort,
        resetFilters,
        isAnyFilterActive,
        // categoriesFilter,
        // setCategoriesFilter
    };
}