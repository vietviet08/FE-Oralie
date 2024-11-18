"use client";

import React, {useEffect, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {CartItem} from "@/model/cart/CartItem";
import {Icons} from "@/components/icons";
import {getCart} from "@/services/CartService";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Avatar} from "@/components/ui/avatar";

// const formSchema = z.object({
//     chooseAll: z.boolean().default(false).optional(),
// });

export default function CartPage() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const {data: session} = useSession();
    const token = session?.access_token as string;
    const {toast} = useToast();

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         chooseAll: false,
    //     },
    // });
    //
    // const onSubmit = (data: z.infer<typeof formSchema>) => {
    //     toast({
    //         title: "You submitted the following values:",
    //         description: (
    //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //         ),
    //     });
    // };

    useEffect(() => {
        async function fetchCartItems() {
            const res = await getCart(token);
            if (res) {
                setCartItems(res);
                setQuantities(res.reduce((acc: Record<number, number>, item: CartItem) => item.id !== undefined ? {
                    ...acc,
                    [item.id]: 1
                } : acc, {}));
                console.log(res);
            }
        }


        if (token) {
            fetchCartItems();
        }
    }, [token]);

    const handleQuantityChange = (itemId: number, change: number) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, (prev[itemId] ?? 1) + change)
        }));
    };

    const handleDeleteItem = (itemId: number) => {
    };

    return (
        <div className="container w-full mx-auto p-4 mt-16 md:mx-32">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="w-3/5">
                <div className=" flex flex-col justify-center space-y-8 mx-4 mb-4">
                    <Card className="w-full">
                        <CardContent className="flex w-full justify-between items-center p-2">
                            <div className="w-full flex justify-between items-center">
                                <Checkbox className="ml-4"/>
                                <Button variant="ghost">
                                    <Icons.trash className="size-7"/>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className=" flex flex-col justify-center space-y-8 mx-4">
                    {cartItems?.map(item => (
                        <div>


                            <Card key={item.id} className={"w-full flex items-center space-x-2"}>
                                <Checkbox className="p-2 ml-6"/>
                                <CardContent className="flex w-full justify-between items-center p-6 pr-0">
                                    <div className="w-3/5 flex justify-between items-center">
                                        {item.urlImageThumbnail ?
                                            <Image className="rounded-xl overflow-hidden" width={100} height={100}
                                                   src={item.urlImageThumbnail}
                                                   alt={item.productName}/>
                                            : <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg">
                                                <Avatar key={item.id}
                                                        className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"/>
                                            </div>
                                        }
                                        <div>
                                            <h2 className="text-xl">{item.productName}</h2>
                                        </div>
                                        <div>
                                            <p className="text-primaryred">${item.price}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="relative flex items-center max-w-[8rem]">
                                            <button type="button" id="decrement-button"
                                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                    onClick={() => item.id !== undefined && handleQuantityChange(item.id, -1)}>
                                                <Icons.minus className="w-3 h-3 text-gray-900 dark:text-white"/>
                                            </button>
                                            <Input type="text" id="quantity-input"
                                                   aria-describedby="helper-text-explanation"
                                                   className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                   value={item.id !== undefined ? quantities[item.id] : ''} readOnly/>
                                            <button type="button" id="increment-button"
                                                    className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                    onClick={() => item.id !== undefined && handleQuantityChange(item.id, 1)}>
                                                <Icons.plus className="w-3 h-3 text-gray-900 dark:text-white"/>
                                            </button>
                                        </div>
                                    </div>
                                    <Button className="mr-2" variant="ghost"
                                            onClick={() => item.id !== undefined && handleDeleteItem(item.id)}>
                                        <Icons.trash className="size-7"/>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}