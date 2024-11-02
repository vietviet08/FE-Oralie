"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Product } from "@/model/product/Product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "images",
    header: "IMAGE",
    cell: ({ row }) => {
      const productImages = row.getValue("images") as { url: string }[];
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
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span>{truncateText(name, 20)}</span>;
    },
  },
  {
    accessorKey: "brand",
    header: "BRAND",
    cell: ({ row }) => {
      const brand = row.getValue("brand") as { name: string };
      return <span>{brand.name}</span>;
    },
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
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <span>{truncateText(description, 50)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
