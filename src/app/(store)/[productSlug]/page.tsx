import {Metadata} from "next";
import {getProductBySlug} from "@/services/ProductService";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import ProductPageDetail from "@/components/store/product/product-detail";
import NotFound from "@/app/not-found";

type Props = {
    params: {
        productSlug: string;
    };
};

export async function generateMetadata(
    {params}: Props,
): Promise<Metadata> {
    const product = await getProductBySlug(params.productSlug);

    if (!product) {
        return {
            title: "Product not found",
            description: "Product not found",
        };
    }

    const url = process.env.NEXT_PUBLIC_BASE_URL + `/${product.slug}`;

    return {
        title: `${product.name}`,
        description: product.description,
        openGraph: {
            ...baseOpenGraph,
            title: `${product.name}`,
            description: product.description,
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

export default async function Page({params}: Props) {
    const product = await getProductBySlug(params.productSlug);

    if (!product) {
        return (
            <div>
                <NotFound></NotFound>
            </div>
        );
    }

    return <ProductPageDetail product={product}/>;
}
