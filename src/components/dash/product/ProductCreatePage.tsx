import React from 'react';
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import ProductForm from "@/components/dash/product/ProductForm";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/admin'},
    {title: 'Products', link: '/admin/products'},
    {title: 'Create', link: '/admin/products/create'}
];

export default function ProductCreatePage() {
    return (
        <PageContainer scrollable>
            <div className="flex-1 space-y-4">
                <Breadcrumbs items={breadcrumbItems}/>
                <ProductForm/>
            </div>
        </PageContainer>
    );
}
