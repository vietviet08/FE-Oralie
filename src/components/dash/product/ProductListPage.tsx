import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import {searchParamsCache} from "@/lib/searchparam";
import {Product} from "@/model/product/Product";
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import ProductTable from "@/components/dash/product/product-tables";
import {getProducts} from "@/services/ProductService";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Products', link: '/admin/products' }
];

type ProductListPage= {};

export default async function ProductListPage({}: ProductListPage) {
    // const search = searchParamsCache.get('q');
    // const categories = searchParamsCache.get('categories');
    const page = searchParamsCache.get('page');
    const size = searchParamsCache.get('size');
    const sortBy = searchParamsCache.get('sortBy');
    const sort = searchParamsCache.get('sort');

    const data = await getProducts(page, size, sortBy, sort);
    const totalProducts = data.totalElements;
    const products: Product[] = data.data;

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Products (${totalProducts})`}
                        description="Manage products (Server side table functionalities.)"
                    />
                    <Link
                        href={'/dashboard/product/new'}
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Link>
                </div>
                <Separator />
                <ProductTable data={products} totalData={totalProducts} />
            </div>
        </PageContainer>
    );
}
