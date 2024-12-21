import OrdersTemplate from "@/components/store/account/orders";
import {Breadcrumbs} from "@/components/common/breadcrumbs";

const breadcrumbItems = [
    {title: 'Home', link: '/'},
    {title: 'Account', link: '/account'},
    {title: 'Orders', link: '/account/orders'}
];

const OrdersPage = () => {
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            <OrdersTemplate/>
        </div>
    );
}

export default OrdersPage;