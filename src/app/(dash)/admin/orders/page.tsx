import {SearchParams} from "nuqs/parsers";
import {searchParamsCache} from "@/lib/searchparam";
import OrderListPage from "@/components/dash/order/OrderListPage";

type pageProps = {
    searchParams: SearchParams;
}

export const metadata = {
    title: 'Dash - Orders',
    description: 'Manage orders',
}

export default function Page({searchParams}: pageProps) {

    searchParamsCache.parse(searchParams);

    return <OrderListPage/>
}