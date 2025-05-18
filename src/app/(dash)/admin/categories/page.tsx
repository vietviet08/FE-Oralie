import {SearchParams} from "nuqs/parsers";
import {searchParamsCache} from "@/lib/searchparam";
import CategoryListPage from "@/components/dash/product/category/CategoryListPage";

type pageProps = {
    searchParams: SearchParams;
}

export const metadata = {
    title: 'Dash - Categories',
    description: 'Manage catgories',
}

export default function Page({searchParams}: pageProps) {

    searchParamsCache.parse(searchParams);

    return <CategoryListPage/>
}