import {Metadata, ResolvingMetadata} from "next";
import {getProductById} from "@/services/ProductService";
import {baseOpenGraph} from "@/components/common/base-open-graph";

type Props = {
    params: {
        productId: string;
    }
}

export async function generateMetadata({params}: Props,
                                       parent: ResolvingMetadata): Promise<Metadata> {

    const product = await getProductById(Number(params.productId));
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/products/${product.id}`;

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
                    url: '',
                }
            ]
        },
        alternates: {
            canonical: url
        }
    }
}

export default async function Page({params}: Props) {

    const product = await getProductById(Number(params.productId));

    return <div>
        {!product && <div className={"text-yellow-500"}>Product not found</div>}
        {product && <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
        </div>
        }
    </div>
}