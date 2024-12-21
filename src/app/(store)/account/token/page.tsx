import TokenUserStore from "@/components/store/account/token";
import {Breadcrumbs} from "@/components/common/breadcrumbs";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/admin'},
    {title: 'Account', link: '/account'},
    {title: 'Token', link: '/account/token'}
];

const TokenPage = () => {
    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            <TokenUserStore/>
        </div>
    );
}

export default TokenPage;