"use client";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {AlertModal} from "@/components/dash/modal/alert-modal";
import {useToast} from "@/hooks/use-toast";
import {useSession} from "next-auth/react";
import {Order} from "@/model/order/Order";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, Plus, Trash} from "lucide-react";
import {deleteOrder} from "@/services/OrderService";
import {OrderDialog} from "@/components/dash/order/OrderDialog";

interface CellActionProps {
    data: Order;
}

const CellAction: React.FC<CellActionProps> = ({data}) => {

    const router = useRouter();

    const {toast} = useToast();
    const {data: session} = useSession();
    const token = session?.access_token as string;

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const onConfirm = async () => {

        try {
            const res = await deleteOrder(token, data.id as number);

            if (res && res.status === 204) {
                toast({
                    variant: "success",
                    title: "Order deleted",
                    description: "Order has been deleted successfully",
                    duration: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Order can't be deleted",
                description: "Order can't be deleted, please try again",
                duration: 3000,
            });
        } finally {
            router.refresh();
            setLoading(false);
        }
    };

    const handleShowDetailOrder = () => {
        <OrderDialog icon={<Plus className="mr-2 h-4 w-4"/>}/>
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-500"/> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            handleShowDetailOrder();
                        }}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-500"/> Detail
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;

