'use client';
import {ColumnDef} from '@tanstack/react-table';
import Image from 'next/image';
import {CellAction} from "@/components/dash/product/brand/brand-table/cell-action";
import {Brand} from "@/model/brand/Brand";

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: 'photo_url',
        header: 'IMAGE',
        cell: ({row}) => {
            return (
                <div className="relative aspect-square">
                    <Image
                        src={row.getValue('photo_url')}
                        alt={row.getValue('name')}
                        fill
                        className="rounded-lg"
                    />
                </div>
            );
        }
    },
    {
        accessorKey: 'name',
        header: 'NAME'
    },
    {
        accessorKey: 'sku',
        header: 'SKU'
    },
    {
        accessorKey: 'quantity',
        header: 'QUANTITY'
    },
    {
        accessorKey: 'price',
        header: 'PRICE'
    },
    {
        accessorKey: 'description',
        header: 'DESCRIPTION'
    },

    {
        id: 'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
];
