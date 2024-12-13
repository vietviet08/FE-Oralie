import {Metadata, ResolvingMetadata} from "next";
import {getProductById} from "@/services/ProductService";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import ProductForm from "@/components/dash/product/ProductForm";

type Props = {
    params: {
        productId: string;
    };
};

export async function generateMetadata(
    {params}: Props,
): Promise<Metadata> {
    const product = await getProductById(Number(params.productId));
    const url =
        process.env.NEXT_PUBLIC_BASE_URL + `/admin/products/id/${product.id}`;

    return {
        title: `Product Detail - ${product.name}`,
        description: product.description,
        openGraph: {
            ...baseOpenGraph,
            title: `Product Detail - ${product.name}`,
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
    const product = await getProductById(Number(params.productId));

    return <ProductForm product={product}/>;
}
