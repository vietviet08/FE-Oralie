"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Product } from "@/model/product/Product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productImage",
    header: "IMAGE",
    cell: ({ row }) => {
      const productImages: { url: string }[] = row.getValue("productImage");
      const firstImageUrl = productImages?.[0]?.url;
      const name = row.getValue("name") as string;
      return (
        <div className="relative aspect-square w-16 h-16">
          {firstImageUrl ? (
            <Image
              src={firstImageUrl}
              alt={name}
              fill
              sizes={"100%"}
              className="rounded-lg object-cover"
            />
          ) : (
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarFallback className="rounded-none">{name}</AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "quantity",
    header: "QUANTITY",
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
