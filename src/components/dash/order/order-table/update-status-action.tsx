import {Order} from "@/model/order/Order";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {updateStatusOrder} from "@/services/OrderService";
import {useToast} from "@/hooks/use-toast";
import {statuses} from "@/constants/order-status";
import {parseJwt} from "@/utils/encryption";

interface UpdateStatusActionProps {
    data: Order;
}

export const UpdateStatusAction: React.FC<UpdateStatusActionProps> = ({data}) => {
    const [status, setStatus] = useState<string>(data.status);
    const [isLoading, setIsLoading] = useState(false);

    const {data: session} = useSession();
    const accessToken = session?.access_token as string;
    
    // Debug token information
    const tokenInfo = accessToken ? parseJwt(accessToken) : null;
    console.log("Token Info:", {
        tokenInfo,
        roles: tokenInfo?.realm_access?.roles || []
    });

    console.log("Session info:", {
        hasSession: !!session,
        hasAccessToken: !!accessToken,
        tokenStart: accessToken ? accessToken.substring(0, 15) + "..." : "MISSING TOKEN"
    });

    const {toast} = useToast();

    // Direct fetch method as a workaround for 401 errors
    const updateOrderStatusDirectFetch = async (orderId: number, newStatus: string) => {
        setIsLoading(true);
        try {
            const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
            const baseUrl = apiBaseUrl + '/api/orders';
            const url = `${baseUrl}/dash/orders/${orderId}/status?status=${newStatus}`;
            
            console.log("Making direct fetch request to:", url);
            
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                console.error("Direct fetch failed:", response.status, response.statusText);
                const errorText = await response.text();
                console.error("Error response:", errorText);
                throw new Error(`Failed to update order status: ${response.status} ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log("Direct fetch succeeded:", result);
            return result;
        } catch (error) {
            console.error("Error in direct fetch:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleClick = async () => {
        const currentIndex = statuses.indexOf(status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const newStatus = statuses[nextIndex];
        
        setIsLoading(true);
        
        try {
            console.log("Attempting to update order status to:", newStatus);
            
            // Try direct fetch first
            try {
                const result = await updateOrderStatusDirectFetch(data.id as number, newStatus);
                console.log("Direct fetch successful:", result);
                setStatus(newStatus);
                
                toast({
                    variant: "success",
                    title: "Order status updated",
                    description: "Order has been updated successfully",
                    duration: 3000,
                });
                return;
            } catch (directFetchError) {
                console.error("Direct fetch failed, trying service method:", directFetchError);
                // Continue to service method if direct fetch fails
            }
            
            // Fall back to service method
            const res = await updateStatusOrder(
                accessToken,
                data.id as number,
                newStatus
            );

            console.log("Service method result:", res);
            if (res) {
                setStatus(newStatus);
                toast({
                    variant: "success",
                    title: "Order status updated",
                    description: "Order has been updated successfully",
                    duration: 3000,
                });
            }
        } catch (e) {
            console.log("Error updating status:", e);
            toast({
                variant: "destructive",
                title: "Order update failed",
                description: (e as unknown as {
                    response?: { data?: { errorMessage?: string } }
                }).response?.data?.errorMessage || "An unknown error occurred",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="dropdown">
            <Button 
                onClick={handleClick} 
                disabled={isLoading || status === "CANCEL" || status === "FAILURE"}
            >
                {isLoading ? "Updating..." : status}
            </Button>
        </div>
    );
}