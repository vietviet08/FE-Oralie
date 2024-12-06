import {buttonVariants} from '@/components/ui/button';
import {Heading} from '@/components/ui/heading';
import {Separator} from '@/components/ui/separator';
import {cn} from '@/lib/utils';
import {Plus} from 'lucide-react';
import Link from 'next/link';
import {searchParamsCacheProduct} from "@/lib/searchparam";
import {Product} from "@/model/product/Product";
import PageContainer from "@/components/dash/page-container";
import {Breadcrumbs} from "@/components/common/breadcrumbs";
import ProductTable from "@/components/dash/product/product-tables";
import {getListProduct} from "@/services/ProductService";

const breadcrumbItems = [
    {title: 'Dashboard', link: '/admin'},
    {title: 'Products', link: '/admin/products'}
];


export default async function ProductListPage() {
    // const search = searchParamsCache.get('q');
    // const categories = searchParamsCache.get('categories');

    // const [page, setPage] = useState<number>(0);
    // const [size, setSize] = useState<number>(10);
    // const [sortBy, setSortBy] = useState<string>('id');
    // const [sort, setSort] = useState<string>('asc');
    // const [products, setProducts] = useState<Product[]>([]);
    //
    // const [totalProducts, setTotalProducts] = useState<number>(0);


    // useEffect(() => {
    //     getProducts(page, size, sortBy, sort).then((data) => {
    //         console.log(data);
    //         setProducts(data.data);
    //         setTotalProducts(data.totalElements);
    //
    //     });
    //     }, [page, size, sortBy, sort]);
    const search = searchParamsCacheProduct.get('search');
    const category = searchParamsCacheProduct.get('category');
    const page = searchParamsCacheProduct.get('page') - 1;
    const size = searchParamsCacheProduct.get('size');
    const sortBy = searchParamsCacheProduct.get('sortBy');
    const sort = searchParamsCacheProduct.get('sort');

    const data = await getListProduct(page, size, sortBy, sort, search, category);
    const products: Product[] = data.data;
    const totalProducts = data.totalElements;
    console.log(products);
    // const totalProducts = totalProducts;
    // const products: Product[] = data.data;

    return (
        <PageContainer>
            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems}/>
                <div className="flex items-start justify-between">
                    <Heading
                        title={`Products (${totalProducts})`}
                        description="Manage products (Server side table functionalities.)"
                    />
                    <Link
                        href={'/admin/products/create'}
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className="mr-2 h-4 w-4"/> Add New
                    </Link>
                </div>
                <Separator/>
                <ProductTable data={products} totalData={totalProducts}/>
            </div>
        </PageContainer>
    );
}
