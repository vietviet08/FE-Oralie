'use client';

import {searchParamsProduct} from '@/lib/searchparam';
import {useQueryState} from 'nuqs';
import {useCallback, useMemo} from 'react';

export function useTableFilters() {
    const [searchQuery, setSearchQuery] = useQueryState(
        'search',
        searchParamsProduct.search
            .withOptions({shallow: false, throttleMs: 1000})
            .withDefault('')
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
        setSearchQuery('');
        setSortBy('id');
        setSort('asc');
        setSize(10);
        setPage(0);
    }, [setSearchQuery, setPage, setSize, setSortBy, setSort]);

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
    };
}
