export type CategoryGet = {
    id?: number;
    name: string;
    slug: string;
    description: string;
    image: string,
    parentId: number,
    isDeleted: boolean;
}