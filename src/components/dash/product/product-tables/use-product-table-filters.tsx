'use client';

import {searchParamsProduct} from '@/lib/searchparam';
import {useQueryState} from 'nuqs';
import {useCallback, useMemo} from 'react';

export function useProductTableFilters() {
    const [search, setSearch] = useQueryState(
        'search',
        searchParamsProduct.search
            .withOptions({shallow: false, throttleMs: 1000})
            .withDefault('')
    );

    const [category, setCategory] = useQueryState(
        'category',
        searchParamsProduct.category.withOptions({shallow: false}).withDefault('')
    );

    const [brand, setBrand] = useQueryState(
        'brand',
        searchParamsProduct.brand.withOptions({shallow: false}).withDefault('')
    );

    const [price, setPrice] = useQueryState(
        'price',
        searchParamsProduct.price.withOptions({shallow: false}).withDefault('')
    );

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
        setSearch('');
        setSortBy('id');
        setSort('asc');
        setSize(10);
        setPage(0);
        setBrand('');
        setCategory('');
        setPrice('');
        // setCategoriesFilter(null);
    }, [setSearch, setPage, setSize, setSortBy, setSort, setBrand, setCategory, setPrice]);

    // const isAnyFilterActive = useMemo(() => {
    //     return !!searchQuery || !!categoriesFilter;
    // }, [searchQuery, categoriesFilter]);
    const isAnyFilterActive = useMemo(() => {
            return !!search ;
        }, [search]);


    return {
        search,
        setSearch,
        page,
        setPage,
        size,
        setSize,
        sortBy,
        setSortBy,
        sort,
        setSort,
        brand,
        setBrand,
        category,
        setCategory,
        price,
        setPrice,
        resetFilters,
        isAnyFilterActive,
    };
}
