'use client';
import {ColumnDef} from '@tanstack/react-table';
import Image from 'next/image';
import {CellAction} from "@/components/dash/product/brand/brand-table/cell-action";
import {Brand} from "@/model/brand/Brand";

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'image',
        header: 'IMAGE',
        cell: ({row}) => {
            return (
                <div className="relative aspect-square w-16 h-16">
                    <Image
                        src={row.getValue('image')}
                        alt={row.getValue('name')}
                        fill
                        sizes={'100%'}
                        className="rounded-lg object-cover"
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
        accessorKey: 'description',
        header: 'DESCRIPTION'
    },
    {
        accessorKey: 'isActive',
        header: 'ACTIVE',
    },



    {
        id: 'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
];
