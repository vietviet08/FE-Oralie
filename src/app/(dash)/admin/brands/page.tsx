import {SearchParams} from "nuqs/parsers";
import {searchParamsCache} from "@/lib/searchparam";
import BrandListPage from "@/components/dash/product/brand/BrandListPage";

type pageProps = {
    searchParams: SearchParams;
}

export const metadata = {
    title: "Dash - Brands",
    description: "Manage brands",
}

export default function Page({searchParams}: pageProps) {

    searchParamsCache.parse(searchParams);

    return <BrandListPage/>
}