import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {Plus} from "lucide-react";
import {searchParamsCache} from "@/lib/searchparam";
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import {getListOrders} from "@/services/OrderService";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";
import NotFound from "@/app/not-found";
import {Session} from "next-auth";
import {getServerSession} from "next-auth/next";
import {Order} from "@/model/order/Order";
import {OrderDialog} from "@/components/dash/order/OrderDialog";
import OrderTable from "@/components/dash/order/order-table";

const breadcrumbItems = [
    {title: "Dashboard", link: "/admin"},
    {title: "Orders", link: "/admin/Orders"},
];

export default async function OrderListPage() {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const page = searchParamsCache.get("page") - 1;
    const size = searchParamsCache.get("size");
    const sortBy = searchParamsCache.get("sortBy");
    const sort = searchParamsCache.get("sort");
    // const search = searchParamsCache.get("search");

    const data = await getListOrders(page, size, sortBy, sort, token);

    const orders: Order[] = data?.data;
    const totalOrders = data?.totalElements;

    console.log(orders);

    if (data == null) return <NotFound/>;
    else
        return (
            <PageContainer>
                <div className="space-y-4">
                    <Breadcrumbs items={breadcrumbItems}/>
                    <div className="flex items-start justify-between">
                        <Heading
                            title={`Order (${totalOrders})`}
                            description="Manage Orders (Server side table functionalities.)"
                        />
                        <OrderDialog icon={<Plus className="mr-2 h-4 w-4"/>}/>
                    </div>
                    <Separator/>
                    <OrderTable data={orders} totalData={totalOrders}/>
                </div>
            </PageContainer>
        );
}
