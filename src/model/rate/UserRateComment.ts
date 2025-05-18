export type UserRateComment = {
    id?: number;
    userId: string;
    rateId: number;
    productId: number;
    isLike: boolean;
}