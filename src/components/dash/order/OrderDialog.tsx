"use client";

import React, {ReactNode, useState} from "react";
import {Order} from "@/model/order/Order";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

type Props = {
    icon: ReactNode;
};

export function OrderDialog({icon}: Props, data: Order) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        /*return table to show order item*/
        <>
            {data.orderItems &&
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Order detail</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Order detail of {data.id}
                            </DialogDescription>
                        </DialogHeader>
                        <Table className="w-full">
                            <TableBody>
                                {data.orderItems.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                    >
                                        <TableCell className=" text-left">{index}</TableCell>
                                        <TableCell className="">
                                            <Image src={item.productImage} alt={item.productName} width={120}
                                                   height={120}/>
                                        </TableCell>
                                        <TableCell className=" text-ellipsis">{item.productName}</TableCell>
                                        <TableCell className=" ">{item.quantity}</TableCell>
                                        <TableCell className=" ">{item.totalPrice}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <DialogFooter>
                            <Button type="button" onClick={() => setIsOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            }
        </>
    );
}
