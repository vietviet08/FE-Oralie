export type CategoryPost = {
    name: string;
    slug?: string;
    image?: File;
    description: string;
    isDeleted: boolean;
    parentId?: number;
}