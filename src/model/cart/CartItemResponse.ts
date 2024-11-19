export type CartItemResponse = {
    id?: number;
    productId: number;
    productName: string;
    urlImageThumbnail: string;
    productSlug: string;
    quantity: number;
    price: number;
    totalPrice: number;
}