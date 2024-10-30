
export type PayPalInfoRequest = {
    total: number;
    currency: string;
    method: string;
    intent: string;
    description: string;
    cancelUrl: string;
    successUrl: string;
}