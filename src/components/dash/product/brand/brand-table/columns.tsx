"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { CellAction } from "@/components/dash/product/brand/brand-table/cell-action";
import { Brand } from "@/model/brand/Brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;
      return (
        <div className="relative aspect-square w-16 h-16">
          {image ? (
            <Image
              src={image}
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
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "isActive",
    header: "ACTIVE",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
