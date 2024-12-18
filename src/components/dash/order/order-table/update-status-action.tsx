import {Order} from "@/model/order/Order";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {updateStatusOrder} from "@/services/OrderService";
import {useToast} from "@/hooks/use-toast";
import {statuses} from "@/constants/order-status";

interface UpdateStatusActionProps {
    data: Order;
}

export const UpdateStatusAction: React.FC<UpdateStatusActionProps> = ({data}) => {
    const [status, setStatus] = useState<string>(data.status);

    const {data: session} = useSession();
    const accessToken = session?.access_token as string;

    const {toast} = useToast();

    const handleClick = async () => {

        const currentIndex = statuses.indexOf(status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        setStatus(statuses[nextIndex]);

        try {
            console.log(accessToken);
            const res = await updateStatusOrder(
                accessToken,
                data.id as number,
                statuses[nextIndex]
            );

            if (res && res.status === 200) {
                toast({
                    variant: "success",
                    title: "Order status updated",
                    description: "Order has been updated successfully",
                    duration: 3000,
                });
            }
        } catch (e) {
            console.log(e);
            toast({
                variant: "destructive",
                title: "Order update failed",
                description: (e as unknown as {
                    response?: { data?: { errorMessage?: string } }
                }).response?.data?.errorMessage || "An unknown error occurred",
                duration: 3000,
            });
        }
    };
    return (
        <div className="dropdown">
            <Button onClick={handleClick} disabled={status === "CANCEL" || status === "FAILURE"}>
                {status}
            </Button>
        </div>
    );
}