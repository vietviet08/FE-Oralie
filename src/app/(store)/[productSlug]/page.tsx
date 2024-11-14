import { Metadata, ResolvingMetadata } from "next";
import { getProductBySlug } from "@/services/ProductService";
import { baseOpenGraph } from "@/components/common/base-open-graph";
import ProductPageDetail from "@/components/store/product/product-detail";

type Props = {
  params: {
    productSlug: string;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductBySlug(params.productSlug);
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

export default async function Page({ params }: Props) {
  const product = await getProductBySlug(params.productSlug);

  return <ProductPageDetail product={product} />;
}
