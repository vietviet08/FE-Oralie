"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { CartItem } from "@/model/cart/CartItem";
import { CartResponse } from "@/model/cart/CartResponse";
import { getCart } from "@/services/CartService";
import { Icons } from "@/components/icons";

export default function CartPage() {
    const [cart, setCart] = useState<CartResponse | null>(null);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const { data: session } = useSession();

    useEffect(() => {
        async function fetchCart() {
            const token = session?.access_token;
            if (!token) {
                console.error('No access token available');
                return;
            }
            try {
                const res: CartResponse | null = await getCart(token);
                if (res) {
                    setCart(res);
                    setQuantities(res.cartItemResponses.reduce((acc: Record<number, number>, item: CartItem) => item.id !== undefined ? { ...acc, [item.id]: 1 } : acc, {}));
                    console.log(res);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        }

        if (session?.access_token) {
            fetchCart();
        }
    }, [session]);

    const handleQuantityChange = (itemId: number, change: number) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, (prev[itemId] ?? 1) + change)
        }));
    };

    const handleDeleteItem = async (itemId: number) => {
        // Implement delete functionality
    };


    return (
        <div className="mx-auto p-4 mt-16 md:mx-32">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="flex md:flex-row gap-2">
                <div className="w-3/5">
                    <div className="flex flex-col justify-center space-y-8 m-0 mb-4">
                        <Card className="w-full">
                            <CardContent className="flex w-full justify-between items-center p-2">
                                <div className="w-full flex justify-between items-center">
                                    <Checkbox className="ml-4" />
                                    <Button variant="ghost">
                                        <Icons.trash className="w-7 h-7 text-primaryred" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col justify-center space-y-8 m-0">
                        {cart?.cartItemResponses?.map(item => (
                            <Card key={item.id} className={"w-full flex items-center space-x-2"}>
                                <Checkbox className="ml-6" />
                                <CardContent className="flex w-full justify-between items-center p-6 pr-0">
                                    <div className="w-3/5 flex justify-between items-center">
                                        {item.urlImageThumbnail ? (
                                            <Image className="rounded-xl overflow-hidden" width={100} height={100} src={item.urlImageThumbnail} alt={item.productName} />
                                        ) : (
                                            <Avatar key={item.id} className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
                                        )}
                                        <div>
                                            <h2 className="text-xl">{item.productName}</h2>
                                        </div>
                                        <div>
                                            <p className="text-primaryred">${item.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative flex items-center max-w-[8rem]">
                                            <button
                                                type="button"
                                                id="decrement-button"
                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                onClick={() => item.id !== undefined && handleQuantityChange(item.id, -1)}
                                            >
                                                <Icons.minus className="w-3 h-3 text-gray-900 dark:text-white" />
                                            </button>
                                            <Input
                                                type="text"
                                                id="quantity-input"
                                                aria-describedby="helper-text-explanation"
                                                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={item.id !== undefined ? quantities[item.id] : ''}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                id="increment-button"
                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                onClick={() => item.id !== undefined && handleQuantityChange(item.id, 1)}
                                            >
                                                <Icons.plus className="w-3 h-3 text-gray-900 dark:text-white" />
                                            </button>
                                        </div>
                                    </div>
                                    <Button className="mr-2" variant="ghost" onClick={() => item.id !== undefined && handleDeleteItem(item.id)}>
                                        <Icons.trash className="w-7 h-7 text-primaryred" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="w-2/5 flex flex-col gap-2">
                    <Card className="w-full">
                        <CardContent className="flex w-full justify-between items-center p-2">
                            <div className="w-full flex-col gap-2 space-y-4 justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold">Order Information</h2>
                                </div>
                                <div className="w-full flex justify-between items-center border-b">
                                    <p className="text-sm">Total</p>
                                    <div className="text-xl font-semibold">${cart?.totalPrice}</div>
                                </div>
                                <div className="flex flex-col space-y-2 border-b border-dashed">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm">Total Promotion</p>
                                        <div className="text-xl font-semibold">${cart?.totalPrice}</div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm">Shipping Fee</p>
                                        <div className="text-sm font-base">Free</div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-sm">Need to Pay</p>
                                    <div className="text-xl font-semibold">${cart?.totalPrice}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Button className="w-full" variant="cart">
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}