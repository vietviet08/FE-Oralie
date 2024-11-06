"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Category } from "@/model/category/Category";
import { CellAction } from "@/components/dash/product/category/category-table/cell-action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "IMAGE  ",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const name = row.getValue("name") as string;
      return (
        <div className="flex justify-center items-center relative aspect-square w-16">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes={"100%"}
              className="rounded-lg object-cover w-16 h-16"
            />
          ) : (
            <Avatar className="h-16 w-16 rounded-xl">
              <AvatarFallback className="rounded-none w-16 h-16">
                {name}
              </AvatarFallback>
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
    accessorKey: "slug",
    header: "SLUG",
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
    accessorKey: "isDeleted",
    header: () => <div className="text-center">ACTIVE</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isDeleted") as boolean;
      return (
        <div className="flex justify-center">
          {!isActive ? (
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
