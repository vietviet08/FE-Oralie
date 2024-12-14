import {Metadata} from "next";
import {getProductByCategoryAndBrand} from "@/services/ProductService";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import NotFound from "@/app/not-found";
import PageProduct from "@/components/store/product/page-product";

type Props = {
    searchParams: {
        category: string;
        brand?: string;
    };
};

export async function generateMetadata(
    {searchParams}: Props,
): Promise<Metadata> {
    const {category, brand} = searchParams;

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

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}?categorySlug=${category}&brand=${brand || ""}`;

    return {
        title: `${searchParams.category} ${productList.totalElements}`,
        description: searchParams.category + productList.totalElements.toString(),
        openGraph: {
            ...baseOpenGraph,
            title: `${searchParams.category} ${productList.totalElements}`,
            description: searchParams.category + productList.totalElements.toString(),
            url,
            images: [
                {
                    url: "",
                },
            ],
        },
        alternates: {
            canonical: url,
        },
    };
}

export default async function Page({searchParams}: Props) {
    const {category, brand} = searchParams;

    const product = await getProductByCategoryAndBrand(0, 20, "id", "asc", category, brand as string);

    console.log(product);

    if (!product) {
        return <NotFound/>;
    }

    return <PageProduct category={category || ""} brand={brand || ""} listResponse={product}/>
}
