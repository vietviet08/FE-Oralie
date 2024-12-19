"use client";

import React, {useEffect, useState} from "react";
import {OrderResponse} from "@/model/order/response/OrderResponse";
import {useSession} from "next-auth/react";
import {getOrders} from "@/services/OrderService";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Icons} from "@/components/icons";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";

const orderHeader = [
    {name: "Index", className: "text-left"},
    {name: "Create at", className: ""},
    {name: "Total price", className: ""},
    {name: "Voucher", className: ""},
    {name: "Discount", className: ""},
    {name: "Shipping fee", className: ""},
    {name: "Payment method", className: ""},
    {name: "Payment status", className: ""},
    {name: "Status order", className: ""},
    {name: "", className: ""}
];
const OrdersTemplate = () => {
    const {data: session,} = useSession();
    const token = session?.access_token as string;

    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState<OrderResponse[]>();

    useEffect(() => {
        async function fetchOrder() {
            const response = await getOrders(token);
            setOrders(response.data);
        }

        fetchOrder();

        console.log(orders);
    }, [orders, token])

    const showDetailOrder = (orderResponse: OrderResponse) => {
        if (orderResponse.orderItems) {
            return (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Order detail</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Order detail of {orderResponse.id}
                            </DialogDescription>
                        </DialogHeader>
                        <Table className="w-full">
                            <TableBody>
                                {orderResponse.orderItems.map((item, index) => (
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
            );
        }
        return null;
    }
    return (
        <div>
            <div className="w-full rounded-lg p-4 flex justify-center items-center">
                {
                    orders && orders.length === 0 &&
                    <div className="flex justify-center items-center">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Oops</AlertTitle>
                            <AlertDescription>
                                Your don&#39;t have any order yet, let&#39;s buy something
                            </AlertDescription>
                        </Alert>
                    </div>
                }
                {orders && orders.length > 0 &&
                    <Table className="w-full">
                        <TableBody>
                            <TableHeader>
                                <TableRow>
                                    {orderHeader.map((item, index) => (
                                        <TableCell key={index} className={item.className}>
                                            {item.name}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            {orders.map((item, index) => (
                                <TableRow
                                    key={item.id}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                >
                                    <TableCell className=" text-left">{index}</TableCell>
                                    <TableCell className="">
                                        {item.createdAt}
                                    </TableCell>
                                    <TableCell className=" ">{item.totalPrice}</TableCell>
                                    <TableCell className=" text-ellipsis">{item.voucher}</TableCell>
                                    <TableCell className=" ">{item.discount}</TableCell>
                                    <TableCell className=" ">{item.shippingFee}</TableCell>
                                    <TableCell className=" ">{item.paymentMethod}</TableCell>
                                    <TableCell className=" ">{item.paymentStatus}</TableCell>
                                    <TableCell className=" ">{item.paymentStatus}</TableCell>
                                    <TableCell className=" ">{item.status}</TableCell>
                                    <TableCell className="">
                                        <Button
                                            variant="outline"
                                            onClick={() => showDetailOrder(item)}
                                        >
                                            Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>
        </div>
    )
}

export default OrdersTemplate