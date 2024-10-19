import {SearchParams} from "nuqs/parsers";
import {searchParamsCache} from "@/lib/searchparam";
import ProductListPage from "@/components/dash/product/ProductListPage";

type pageProps = {
    searchParams: SearchParams;
};

export const metadata = {
    title: 'Dash - Products',
}

export default function Page({searchParams}: pageProps) {
    searchParamsCache.parse(searchParams);

    return (
        <ProductListPage />
    );
}