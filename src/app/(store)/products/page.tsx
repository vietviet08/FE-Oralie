// src/app/(store)/products/page.tsx
import { Metadata } from "next";
import { getProductByCategoryAndBrand } from "@/services/ProductService";
import { baseOpenGraph } from "@/components/common/base-open-graph";
import PageProduct from "@/components/store/product/page-product";
import {searchParamsCacheProduct } from "@/lib/searchparam";
import { ParsedUrlQuery } from "querystring";
import { unstable_noStore as noStore } from "next/cache";

type Props = {
    searchParams: {
        category: string;
        brand?: string;
    };
};

type pageProps = {
    searchParams: ParsedUrlQuery;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {

    noStore();
    const { category, brand } = searchParams || {};
    if (!category) {
        return {
            title: "Category not specified",
            description: "Please provide a valid category.",
        };
    }

    const productList = await getProductByCategoryAndBrand(0, 20, "id", "asc", category, brand as string);

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


export default function Page({searchParams }: pageProps) {
    searchParamsCacheProduct.parse(searchParams);
    return <PageProduct />;
}