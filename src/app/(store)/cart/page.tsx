"use client";

import React, {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Avatar} from "@/components/ui/avatar";
import {CartResponse} from "@/model/cart/CartResponse";
import {clearCart, getCart, removeProductFromCart, updateProductQuantity} from "@/services/CartService";
import {Icons} from "@/components/icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import Link from "next/link";
import {Breadcrumbs} from "@/components/common/breadcrumbs";

export default function CartPage() {
    const breadcrumbItems = [
        {title: 'Home', link: '/'},
        {title: 'Cart', link: '/cart'}
    ];

    const domainUrl = process.env.NEXT_PUBLIC_URL;

    const {data: session} = useSession();
    const token = session?.access_token as string;

    const [cart, setCart] = useState<CartResponse | null>(null);

    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    useEffect(() => {
        if (!token) return;

        async function fetchCart() {
            try {
                const res: CartResponse | null = await getCart(token);
                if (res) {
                    setCart(res);
                    const initialQuantities: { [key: number]: number } = {};
                    res.cartItemResponses?.forEach(item => {
                        if (item.id && item.quantity) {
                            initialQuantities[item.id] = item.quantity;
                        }
                    });
                    console.log('Initializing quantities:', initialQuantities);
                    setQuantities(initialQuantities);
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        }

        fetchCart();

    }, [token]);


    const handleQuantityChange = async (itemId: number, productId: number, optionId: number, change: number) => {
        console.log(`Handling quantity change for product ${productId}, change: ${change}`);
        try {
            const currentQuantity = quantities[itemId] || 0;
            const newQuantity = Math.max(1, currentQuantity + change);

            console.log(`Current quantity: ${currentQuantity}, New quantity: ${newQuantity}`);

            const response = await updateProductQuantity(token, productId, itemId, optionId, newQuantity);
            console.log('Update quantity response:', response);

            if (response) {
                setQuantities(prev => ({...prev, [itemId]: newQuantity}));
                setCart(response);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleDeleteItem = async (itemId: number) => {
        console.log(`Deleting item ${itemId} from cart`);
        try {
            const response = await removeProductFromCart(token, itemId);
            console.log('Delete item response:', response);

            if (response) {
                setCart(response);
                setSelectedItems(prev => prev.filter(id => id !== itemId));
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleClearCart = async () => {
        console.log('Clearing selected items');
        try {
            if (selectAll) {
                const response = await clearCart(token);
                console.log('Clear cart response:', response);

                if (response) {
                    const updatedCart = await getCart(token);
                    setCart(updatedCart);
                    setSelectedItems([]);
                    setSelectAll(false);
                }
            } else {
                for (const itemId of selectedItems) {
                    await removeProductFromCart(token, itemId);
                }
                const updatedCart = await getCart(token);
                setCart(updatedCart);
                setSelectedItems([]);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const handleItemSelection = (itemId: number) => {
        console.log(`Toggling selection for item ${itemId}`);
        setSelectedItems(prev => {
            const newSelection = prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId];
            console.log('New selection:', newSelection);
            return newSelection;
        });
    };

    const handleOptionChange = async (itemId: number, productId: number, optionId: number) => {
        console.log(`Changing option for item ${itemId} to option ${optionId}`);
        try {
            const response = await updateProductQuantity(token, productId, itemId, optionId, quantities[itemId]);
            console.log('Update option response:', response);

            if (response) {
                setCart(response);
            }
        } catch (error) {
            console.error('Error updating option:', error);
        }
    };

    const handleSelectAll = () => {
        console.log('Toggling select all');
        setSelectAll(prev => {
            const newSelectAll = !prev;
            console.log('New select all state:', newSelectAll);

            if (newSelectAll && cart?.cartItemResponses) {
                const allItemIds = cart.cartItemResponses.map(item => item.id!);
                console.log('Selecting all products with items id:', allItemIds);
                setSelectedItems(allItemIds);
            } else {
                console.log('Deselecting all products');
                setSelectedItems([]);
            }

            return newSelectAll;
        });
    };

    return (
        <div className="px-6 my-24 mb-8 md:mx-32 md:px-0 sm:px-32 px-6 py-6 mt-14">
            <div className="mb-4">
                <Breadcrumbs items={breadcrumbItems}/>
            </div>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <span className="text-xs">
                There is currently {cart?.quantity} product.
            </span>
            </div>
            <div className="flex flex-col xl:flex-row gap-2">
                <div className="w-full xl:w-3/5">
                    <div className="flex flex-col justify-center space-y-8 m-0 mb-4">
                        <Card className="w-full">
                            <CardContent className="flex w-full justify-between items-center p-0">
                                <div className="w-full flex justify-between items-center">
                                    <Checkbox
                                        className="ml-3 md:ml-6"
                                        checked={selectAll}
                                        onCheckedChange={() => handleSelectAll()}
                                    />
                                    <Button variant="ghost" onClick={handleClearCart}
                                            disabled={selectedItems.length === 0}>
                                        <Icons.trash className="w-7 h-7 mr-2 text-primaryred"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col justify-center space-y-4 m-0">
                        {cart?.cartItemResponses?.map((item) => (
                            <Card key={item.id} className={"w-full flex items-center space-x-2"}>
                                <Checkbox
                                    className="ml-3 md:ml-6"
                                    checked={selectedItems.includes(item.id!)}
                                    onCheckedChange={() => handleItemSelection(item.id!)}
                                />
                                <CardContent
                                    className="flex w-full justify-between items-center py-6 px-0 gap-4 lg:gap-0">
                                    <div className="w-4/6 flex justify-between items-center space-x-2 gap-1">
                                        <div
                                            className=" flex flex-col sm:flex-row items-center space-x-2">
                                            <Link
                                                href={domainUrl + "/" + item.productSlug}
                                            >
                                                {item.urlImageThumbnail ? (
                                                    <Image
                                                        className="rounded-xl overflow-hidden"
                                                        width={100}
                                                        height={100}
                                                        sizes={"100px"}
                                                        src={item.urlImageThumbnail}
                                                        alt={item.productName}
                                                    />
                                                ) : (
                                                    <Avatar
                                                        key={item.id}
                                                        className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"
                                                    />
                                                )}
                                            </Link>
                                            <div className="flex flex-col w-full justify-center">
                                                <Link href={item.productSlug}>
                                                    <div className="w-full overflow-hidden">
                                                        <h2 className="text-sm hover:text-primaryred line-clamp-3">
                                                            {item.productName}
                                                        </h2>
                                                    </div>
                                                </Link>
                                                <div className="w-full sm:w-3/5 lg:w-3/6 my-1">
                                                    <Select
                                                        value={item.productOptionId?.toString()}
                                                        onValueChange={(value) => handleOptionChange(item.id!, item.productId, parseInt(value))}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Options"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                {item.productOptions.map(option => (
                                                                    <SelectItem key={option.id}
                                                                                value={option.id!.toString()}>
                                                                        {option.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-primaryred">${item.price}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="relative flex items-center  w-1/5 sm:w-2/5">
                                            <Button
                                                type="button"
                                                id="decrement-button"
                                                className="shadow-none rounded-r-none bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-9 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                                onClick={() =>
                                                    item.productId !== undefined &&
                                                    handleQuantityChange(item.id!, item.productId, item.productOptionId, -1)
                                                }
                                            >
                                                <Icons.minus className="w-3 h-3 text-gray-900 dark:text-white"/>
                                            </Button>
                                            <Input
                                                type="text"
                                                id="quantity-input"
                                                className="bg-gray-50 border-x-0 rounded-none border-gray-300 h-9 w-9 p-0 text-center focus:ring-0 focus:outline-none focus:border-none"
                                                value={item.productId !== undefined ? quantities[item.id!] : ""}
                                                readOnly
                                            />
                                            <Button
                                                type="button"
                                                id="increment-button"
                                                className="shadow-none rounded-l-none bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-9"
                                                onClick={() =>
                                                    item.productId !== undefined &&
                                                    handleQuantityChange(item.id!, item.productId, item.productOptionId, 1)
                                                }
                                            >
                                                <Icons.plus className="w-3 h-3 text-gray-900 dark:text-white"/>
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        className="mr-2"
                                        variant="ghost"
                                        onClick={() => item.id !== undefined && handleDeleteItem(item.id)}
                                        disabled={!selectedItems.includes(item.id!)}
                                    >
                                        <Icons.trash className="w-7 h-7 text-primaryred"/>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="w-full xl:w-2/5 flex flex-col gap-2">
                    <Card className="w-full">
                        <CardContent className="flex w-full justify-between items-center p-2">
                            <div className="w-full flex-col gap-2 space-y-4 justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold">Order Information</h2>
                                </div>
                                <div
                                    className="w-full pb-2 flex justify-between items-center border-b border-dashed border-gray-400">
                                    <p className="text-sm">Total</p>
                                    <div className="text-xl font-semibold">$ {cart?.totalPrice}</div>
                                </div>
                                <div className="flex flex-col space-y-2 pb-2 border-b border-dashed border-gray-400">
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm">Total Promotion</p>
                                        <div className="text-xl font-semibold">$ {cart?.totalPrice}</div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm">Shipping Fee</p>
                                        <div className="text-sm font-base">Free</div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center">
                                    <p className="text-sm">Need to Pay</p>
                                    <div className="text-xl font-semibold">$ {cart?.totalPrice}</div>
                                </div>
                                <Link href={"/checkout"} className="w-full">
                                    <Button type="button" className="w-full h-10 my-3 bg-primaryred hover:bg-red-500 text-white">
                                        Go To Payment
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
