"use client";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {AlertModal} from "@/components/dash/modal/alert-modal";
import {useToast} from "@/hooks/use-toast";
import {useSession} from "next-auth/react";
import {
    deleteBrand,
} from "@/services/BrandService";
import {Order} from "@/model/order/Order";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import { MoreHorizontal, Trash} from "lucide-react";

interface CellActionProps {
    data: Order;
}

const CellAction: React.FC<CellActionProps> = ({data}) => {

    const router = useRouter();

    const {toast} = useToast();
    const {data: session} = useSession();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onConfirm = async () => {
        const token = session?.access_token as string;

        try {
            const res = await deleteBrand(data.id as number, token);

            if (res && res.status === 200) {
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
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default CellAction;

