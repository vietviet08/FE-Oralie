import {buttonVariants} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Separator} from '@/components/ui/separator';
import {cn} from '@/lib/utils';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import {searchParamsCache} from "@/lib/searchparam";
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import CategoryTable from "@/components/dash/product/category/category-table";
import {getListCategory} from "@/services/CategoryService";
import {CategoryGet} from "@/model/category/CategoryGet";
import {getServerSession, Session} from "next-auth";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/admin'},
    {title: 'Categories', link: '/admin/categories'}
];


export default async function CategoryListPage() {

    const page = searchParamsCache.get('page') - 1;
    const size = searchParamsCache.get('size');
    const sortBy = searchParamsCache.get('sortBy');
    const sort = searchParamsCache.get('sort');

    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const data = await getListCategory(page, size, sortBy, sort, token);

    const categories: CategoryGet[] = data.data;
    const totalCategories = data.totalElements;

    console.log(data);
    console.log(token);

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Categories (${totalCategories})`}
                        description="Manage categories (Server side table functionalities.)"
                    />
                    <Link
                        href={'/admin/categories/create'}
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className="mr-2 h-4 w-4"/> Add New
                    </Link>
                </div>
                <Separator/>
                <CategoryTable data={categories} totalData={totalCategories}/>
            </div>
        </PageContainer>
    );
}