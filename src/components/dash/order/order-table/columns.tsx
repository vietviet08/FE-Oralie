"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Order} from "@/model/order/Order";
import CellAction from "@/components/dash/order/order-table/cell-action";
import {UpdateStatusAction} from "@/components/dash/order/order-table/update-status-action";
import {OrderAddressResponse} from "@/model/order/response/OrderAddressResponse";

const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
};

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "createAt",
        header: "CREATE AT",
    },{
        accessorKey: "address",
        header: "ADDRESS",
        cell: ({row}) => {
            const address = row.getValue("address") as OrderAddressResponse;
            return <span>{truncateText(address.addressDetail, 50)}</span>;
        }
    },
    {
        accessorKey: "paymentMethod",
        header: "PAYMENT METHOD",
    }, {
        accessorKey: "paymentStatus",
        header: "PAYMENT STATUS",
    },
    {
        accessorKey: "totalPrice",
        header: "TOTAL PRICE",
    }, {
        accessorKey: "discount",
        header: "DISCOUNT",
    }, {
        accessorKey: "shippingFee",
        header: "SHIPPING FEE",
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({row}) =>
            <UpdateStatusAction data={row.original}/>
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original}/>,
    }
]