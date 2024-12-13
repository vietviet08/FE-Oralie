import {Metadata} from "next";
import {baseOpenGraph} from "@/components/common/base-open-graph";
import {getCategoryById} from "@/services/CategoryService";
import {Session} from "next-auth";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/(auth)/api/auth/[...nextauth]/route";
import {notFound} from "next/navigation";

type Props = {
    params: {
        id: string;
    }
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const session: Session | null = await getServerSession(authOptions);
    const token = session?.access_token as string;

    const category = await getCategoryById(Number(params.id), token);
    if (!category || category.status === 404) {
        return {
            title: 'Category not found',
            description: 'Category not found',
            openGraph: {
                ...baseOpenGraph,
                title: 'Category not found',
                description: 'Category not found',
                images: [
                    {
                        url: '',
                    }
                ]
            },
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL + `/categories/${category.id}`;

    return {
        title: `Category update - ${category.name}`,
        description: category.description,
        openGraph: {
            ...baseOpenGraph,
            title: `Category update - ${category.name}`,
            description: category.description,
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

    const category = await getCategoryById(Number(params.id), token);
    if (!category || category.status === 404) {
        notFound();
    }

    return <>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
    </>
}