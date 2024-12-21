import {Breadcrumbs} from "@/components/common/breadcrumbs";

const breadcrumbItems = [
    {title: 'Home', link: '/'},
    {title: 'Account', link: '/account'},
    {title: 'Address', link: '/account/address'}
];

const AddressPage = () => {

    return (
        <div>
            <Breadcrumbs items={breadcrumbItems}/>
            <h1>Address page</h1>
        </div>
    );
}

export default AddressPage;