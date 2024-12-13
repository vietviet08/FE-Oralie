"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "./cell-action";
import { Product } from "@/model/product/Product";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

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
      return <span title={name}>{truncateText(name, 20)}</span>;
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
    accessorKey: "productCategories",
    header: "CATEGORY",
    cell: ({ row }) => {
      const categories = row.getValue("productCategories") as {
        name: string;
      }[];
      return (
        <div>
          {categories.map((category, index) => (
            <div key={index}>{category.name}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">QUANTITY</div>,
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return <span className="flex justify-center">{quantity}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <span>{price}$</span>;
    },
  },
  {
    accessorKey: "discount",
    header: () => <div className="text-center">DISCOUNT</div>,
    cell: ({ row }) => {
      const discount = row.getValue("discount") as number;
      return (
        <span className="flex justify-center">
          {discount ? `${discount}$` : "0$"}
        </span>
      );
    },
  },
  {
    accessorKey: "options",
    header: "OTPIONS",
    cell: ({ row }) => {
      const options = row.getValue("options") as {
        name: string;
        value: string;
      }[];
      return (
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <span>{option.name}</span>: <span>{option.value}</span>
            </div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <span>{truncateText(description, 30)}</span>;
    },
  },
  {
    accessorKey: "isAvailable",
    header: "ACTIVE",
    cell: ({ row }) => {
      const isActive = row.getValue("isAvailable") as boolean;
      return (
        <div className="flex justify-center">
          {isActive ? (
            <Icons.check className="text-green-500" />
          ) : (
            <Icons.close className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
