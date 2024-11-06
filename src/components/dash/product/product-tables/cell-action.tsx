"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleCheck, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Product } from "@/model/product/Product";
import { AlertModal } from "@/components/dash/modal/alert-modal";
import { useSession } from "next-auth/react";
import {
  deleteProduct,
  updateAvailabelProduct,
} from "@/services/ProductService";
import { useToast } from "@/hooks/use-toast";

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [isTemporaryDelete, setIsTemporaryDelete] = useState(false);

  const router = useRouter();

  const onConfirm = async () => {
    const token = session?.access_token as string;

    try {
      let res;
      if (isTemporaryDelete) {
        res = await updateAvailabelProduct(data.id as number, token);

        if (res && res.status === 200) {
          toast({
            title: "Product updated",
            description: "Product has been update successfully",
            duration: 5000,
          });
        }
      } else {
        res = await deleteProduct(data.id as number, token);
        if (res && res.status === 204) {
          toast({
            title: "Product deleted",
            description: "Product has been deleted successfully",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Product can't be deleted",
        description: "Product can't be deleted, please try again",
        duration: 5000,
      });
    } finally {
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
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setIsTemporaryDelete(true);
            }}
          >
            {data.isAvailable ? (
              <>
                <Trash className="mr-2 h-4 w-4 text-yellow-500" /> Deactivate
              </>
            ) : (
              <>
                <CircleCheck className="mr-2 h-4 w-4 text-green-500" /> Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
              setIsTemporaryDelete(false);
            }}
          >
            <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
