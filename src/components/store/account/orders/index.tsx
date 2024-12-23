"use client";

import React, {useEffect, useState} from "react";
import {OrderResponse} from "@/model/order/response/OrderResponse";
import {useSession} from "next-auth/react";
import {cancelOrderByCustomer, getOrders} from "@/services/OrderService";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import toast from "react-hot-toast";

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
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

    useEffect(() => {
        async function fetchOrder() {
            const response = await getOrders(token);
            setOrders(response.data);
        }

        fetchOrder();
    }, [token])


    const handleOpenDetailOrder = (orderResponse: OrderResponse) => {
        setSelectedOrder(orderResponse);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    }

    const handledCancelOrder = async (orderResponse: OrderResponse) => {
        try {
            const res = await cancelOrderByCustomer(token, orderResponse.id as number);
            if (res) {
                toast.success("Cancel order successfully");
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <div className="w-full rounded-lg p-4 flex justify-center items-center">
                {
                    orders && orders.length === 0 &&
                    <div className="flex justify-center items-center">
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Oops</AlertTitle>
                            <AlertDescription>
                                Your don&#39;t have any order yet, let&#39;s buy something
                            </AlertDescription>
                        </Alert>
                    </div>
                }
                {orders && orders.length > 0 &&
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                {orderHeader.map((item, index) => (
                                    <TableCell key={index} className={item.className}>
                                        {item.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
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
                                    <TableCell className=" ">{item.status}</TableCell>
                                    <TableCell className="">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleOpenDetailOrder(item)}
                                        >
                                            Detail
                                        </Button>
                                    </TableCell>
                                    <TableCell className="">
                                        <Button
                                            variant="destructive"
                                            onClick={() => handledCancelOrder(item)}
                                            disabled={item.status === "SHIPPING" || item.status === "CANCELLED"}
                                        >
                                            Cancel
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail your order</DialogTitle>
                        <DialogDescription>
                            Order code: {selectedOrder?.id}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && selectedOrder.orderItems &&
                        <Table className="w-full">
                            <TableBody>
                                {selectedOrder.orderItems.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                                    >
                                        <TableCell className=" text-left">{index}</TableCell>
                                        <TableCell className="">
                                            {item.productImage ? (
                                                <Image src={item.productImage}
                                                       alt={item.productName}
                                                       width={120}
                                                       height={120}
                                                       className="w-12 object-cover"/>
                                            ) : (
                                                "No Image Available"
                                            )}
                                        </TableCell>
                                        <TableCell className=" text-ellipsis">{item.productName}</TableCell>
                                        <TableCell className=" ">{item.quantity}</TableCell>
                                        <TableCell className=" ">{item.totalPrice}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleCloseDialog}
                                className="bg-primaryred text-white border-primaryred hover:bg-white hover:text-primaryred">
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default OrdersTemplate