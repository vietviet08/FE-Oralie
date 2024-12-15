import {
    createSearchParamsCache,
    createSerializer,
    parseAsInteger,
    parseAsString
} from 'nuqs/server';

export const searchParams = {
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault('id'),
    sort: parseAsString.withDefault('asc'),
};

export const searchParamsProduct = {
    ...searchParams,
    category: parseAsString.withDefault(''),
    brand: parseAsString.withDefault(''),
    price: parseAsString.withDefault(''),
};

export const searchParamsCacheProduct = createSearchParamsCache(searchParamsProduct);

export const searchParamsCache = createSearchParamsCache(searchParams);

export const serialize = createSerializer(searchParamsProduct);
