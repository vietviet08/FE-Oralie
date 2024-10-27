'use client';
import {ColumnDef} from '@tanstack/react-table';
import Image from 'next/image';
import {Category} from "@/model/category/Category";
import {CellAction} from "@/components/dash/product/category/category-table/cell-action";

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'photo_url',
        header: 'IMAGE',
        // cell: ({row}) => {
        //     return (
        //         <div className="relative aspect-square">
        //             <Image
        //                 src={row.getValue('image')}
        //                 alt={row.getValue('name')}
        //                 fill
        //                 className="rounded-lg"
        //             />
        //         </div>
        //     );
        // }
    },
    {
        accessorKey: 'name',
        header: 'NAME'
    },
    {
        accessorKey: 'slug',
        header: 'SLUG'
    },
    {
        accessorKey: 'description',
        header: 'DESCRIPTION'
    },
    {
        accessorKey: 'isDeleted',
        header: 'DELETED',
    },

    {
        id: 'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
];
