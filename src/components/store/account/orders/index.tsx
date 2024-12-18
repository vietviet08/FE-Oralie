"use client";

import React, {useEffect, useState} from "react";
import {OrderResponse} from "@/model/order/response/OrderResponse";
import {useSession} from "next-auth/react";
import {getOrders} from "@/services/OrderService";
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";

const OrdersTemplate = () => {
    const {data: session,} = useSession();
    const token = session?.access_token as string;

    const [orders, setOrders] = useState<OrderResponse[]>();

    useEffect(() => {
        async function fetchOrder() {
            const response = await getOrders(token);
            setOrders(response);
        }

        fetchOrder();
    }, [token])

    return (
        <div>
            <div className=" w-full rounded-lg p-4">
                <h2 className=" font-bold text-lg">Your orders</h2>
                <Table>
                    <TableBody>
                        {orders?.map((order, index) => (
                            <TableRow
                                key={order.id}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                            >
                                <TableCell className="w-2/6">{index}</TableCell>
                                <TableCell className="w-4/6 text-left">{order.createAt}</TableCell>
                                <TableCell className="w-4/6 text-center">{order.totalPrice}</TableCell>
                                <TableCell className="w-4/6 text-center">{order.shippingFee}</TableCell>
                                <TableCell className="w-4/6 text-center">{order.discount}</TableCell>
                                <TableCell className="w-4/6 text-center">{order.paymentMethod}</TableCell>
                                <TableCell className="w-4/6 text-center">{order.paymentStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default OrdersTemplate