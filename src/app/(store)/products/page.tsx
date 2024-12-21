import {Metadata} from "next";
import {getProductByCategoryAndBrand} from "@/services/ProductService";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import PageProduct from "@/components/store/product/page-product";
import {searchParamsCacheProduct, serializeProduct} from "@/lib/searchparam";
import {unstable_noStore as noStore} from "next/cache";
import {SearchParams} from "nuqs/parsers";
import {Suspense} from "react";
import {SkeletonCard} from "@/components/common/skeleton-card";
import {Separator} from "@/components/ui/separator";

type pageProps = {
    searchParams: SearchParams;
};

type Props = {
    searchParams: {
        category: string;
        brand?: string;
        page?: number;
        size?: number;
        sortBy?: string;
        sort?: string;
    };
};

export async function generateMetadata({searchParams}: Props): Promise<Metadata> {

    noStore();
    const {category, brand, page, size, sortBy, sort} = searchParams || {};
    if (!category) {
        return {
            title: "Category not specified",
            description: "Please provide a valid category.",
        };
    }

    const productList = await getProductByCategoryAndBrand(page ?? 1,
        size ?? 10,
        sortBy ?? "id",
        sort ?? "asc",
        category,
        brand as string);

    if (!productList) {
        return {
            title: "Page not found",
            description: "Page not found",
        };
    }

    if (!productList) {
        return {
            title: "Page not found",
            description: "Page not found",
        };
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}?categorySlug=${category}&brand=${brand || ""}`;

    return {
        title: `${category} ${productList.totalElements}`,
        description: `${category} ${productList.totalElements}`,
        openGraph: {
            ...baseOpenGraph,
            title: `${category} ${productList.totalElements}`,
            description: `${category} ${productList.totalElements}`,
            url,
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function Page({searchParams}: pageProps) {
    searchParamsCacheProduct.parse(searchParams);

    const key = serializeProduct({...searchParams});

    return <div className="sm:px-32 px-6 py-6 mt-14">
        <Separator />
        <Suspense
            key={key}
            fallback={<SkeletonCard/>}
        >
            <PageProduct/>
        </Suspense>
    </div>;
}