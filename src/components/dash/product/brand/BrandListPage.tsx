import {buttonVariants} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Separator} from '@/components/ui/separator';
import {cn} from '@/lib/utils';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import {searchParamsCache} from "@/lib/searchparam";
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import {Brand} from "@/model/brand/Brand";
import {getListBrand} from "@/services/BrandService";
import BrandTable from "@/components/dash/product/brand/brand-table";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/admin'},
    {title: 'Brands', link: '/admin/brands'}
];


export default async function BrandListPage() {

    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const page = searchParamsCache.get('page') - 1;
    const size = searchParamsCache.get('size');
    const sortBy = searchParamsCache.get('sortBy');
    const sort = searchParamsCache.get('sort');

    const data = await getListBrand(page, size, sortBy, sort, token?.toString());

    const brands: Brand[] = data.data;
    const totalBrands = data.totalElements;

    console.log(brands);

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Categories (${totalBrands})`}
                        description="Manage categories (Server side table functionalities.)"
                    />
                    <Link
                        href={'/admin/brands/create'}
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className="mr-2 h-4 w-4"/> Add New
                    </Link>
                </div>
                <Separator/>
                <BrandTable data={brands} totalData={totalBrands}/>
            </div>
        </PageContainer>
    );
}