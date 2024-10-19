import {
    createSearchParamsCache,
    createSerializer,
    parseAsInteger,
    parseAsString
} from 'nuqs/server';

export const searchParams = {
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(10),
    sortBy: parseAsString.withDefault('id'),
    sort: parseAsString.withDefault('asc'),
    q: parseAsString,
    gender: parseAsString,
    categories: parseAsString
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
