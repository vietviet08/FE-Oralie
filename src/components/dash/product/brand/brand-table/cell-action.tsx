'use client';
import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Edit, MoreHorizontal, Trash} from 'lucide-react';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {AlertModal} from "@/components/dash/modal/alert-modal";
import {Brand} from "@/model/brand/Brand";
import {useToast} from "@/hooks/use-toast";
import {useSession} from "next-auth/react";
import {deleteBrand} from "@/services/BrandService";

interface CellActionProps {
    data: Brand;
}

export const CellAction: React.FC<CellActionProps> = ({data}) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const {toast} = useToast();
    const {data: session} = useSession();

    const onConfirm = async () => {
        const token = session?.access_token as string;

        try {
            const res = await deleteBrand(data.id as number, token);
            if (res && res.status === 200) {
                toast({
                    title: "Brand deleted",
                    description: "Brand has been deleted successfully",
                    duration: 5000,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Brand cant be deleted",
                description: "Brand cant be deleted, please try again",
                duration: 5000,
            });
        }finally {
            setOpen(false);
            setLoading(false);
            router.refresh();
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
                        onClick={() => router.push(`/admin/brands/${data.id}`)}
                    >
                        <Edit className="mr-2 h-4 w-4"/> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
