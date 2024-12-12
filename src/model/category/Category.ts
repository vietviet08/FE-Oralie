export type Category = {
    id?: number;
    name: string;
    slug: string;
    description: string;
    image: string,
    parentId: number,
    isDeleted: boolean;
}