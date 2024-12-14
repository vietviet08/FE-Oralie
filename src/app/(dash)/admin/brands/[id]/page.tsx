import {Metadata} from "next";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import {getCategoryById} from "@/services/CategoryService";
import { Session} from "next-auth";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";
import {notFound} from "next/navigation";
import {getBrandById} from "@/services/BrandService";
import {getServerSession} from "next-auth";

type Props = {
    params: {
        id: string;
    }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const brand = await getBrandById(Number(params.id), token);
    if (!brand || brand.status === 404) {
        return {
            title: 'Brand not found',
            description: 'Brand not found',
            openGraph: {
                ...baseOpenGraph,
                title: 'Brand not found',
                description: 'Brand not found',
                images: [
                    {
                        url: '',
                    }
                ]
            },
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/brands/${brand.id}`;

    return {
        title: `Brand update - ${brand.name}`,
        description: brand.description,
        openGraph: {
            ...baseOpenGraph,
            title: `Brand update - ${brand.name}`,
            description: brand.description,
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
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const brand = await getCategoryById(Number(params.id), token);
    if (!brand || brand.status === 404) {
        notFound();
    }

    return <>
        <h1>{brand.name}</h1>
        <p>{brand.description}</p>
    </>
}