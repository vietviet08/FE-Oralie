export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPING = "SHIPPING",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED",
    REFUNDED = "REFUNDED",
    FAILED = "FAILED",
    COMPLETED = "COMPLETED",
    EXPIRED = "EXPIRED"
}

export const statuses: string[] = [
    "PENDING",
    "PROCESSING",
    "SHIPPING",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
    "REFUNDED",
    "FAILED",
    "COMPLETED",
    "EXPIRED"
];