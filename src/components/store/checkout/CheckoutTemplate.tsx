"use client";

import Link from "next/link";
import {Icons} from "@/components/icons";
import {CartItemResponse} from "@/model/cart/CartItemResponse";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {CartResponse} from "@/model/cart/CartResponse";
import {createOrder, createOrderWithPayPal} from "@/services/OrderService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useEffect, useState} from "react";
import {parseJwt} from "@/utils/encryption";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {OrderRequest} from "@/model/order/OrderRequest";
import {Label} from "@/components/ui/label";
import {getCart} from "@/services/CartService";
import {getProductOptionById} from "@/services/ProductOptionService";
import {useToast} from "@/hooks/use-toast";

const formSchema = z.object({
    fullName: z.string().min(3, "Name is too short").nonempty("Name is required"),
    phone: z.string().nonempty("Phone is required"),
    address: z
        .string()
        .min(5, "Address is too short")
        .nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    paymentMethod: z.string().nonempty("Payment method is required"),
});

const CheckoutTemplate = () => {
    const {data: session} = useSession();
    const token = session?.access_token as string;
    const infoUser = parseJwt(token as string);
    const [data, setData] = useState<CartResponse>();
    const [productOption, setProductOption] = useState<string[]>();
    const router = useRouter();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [defaultValues, setDefaultValues] = useState<{
        fullName: string;
        phone: string;
        address: string;
        city: string;
        email: string;
        paymentMethod: string;
    }>({
        fullName: infoUser.name as string,
        phone: infoUser.phone as string,
        address: infoUser.address_detail as string,
        city: infoUser.city as string,
        email: infoUser.email as string,
        paymentMethod: "COD",
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        async function fetchCart() {
            try {
                const res: CartResponse = await getCart(token);
                if (res && res.cartItemResponses && res.cartItemResponses.length > 0) {
                    setData(res);
                } else {
                    router.push("/cart");
                }
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        }

        fetchCart();
    }, [token, router]);

    useEffect(() => {
        async function fetchProductOption() {
            if (!data?.cartItemResponses) return;

            try {
                const productOptions = await Promise.all(
                    data?.cartItemResponses.map(async (item: CartItemResponse) => {
                        const option = await getProductOptionById(item.productOptionId);
                        return option.name;
                    })
                );
                setProductOption(productOptions.filter(Boolean) as string[]);
            } catch (error) {
                console.error("Failed to fetch product option:", error);
            }
        }

        fetchProductOption();

    }, [data]);

    const handlePaymentMethodChange = (paymentMethod: string) => {
        form.setValue("paymentMethod", paymentMethod);
    };

    const handlePaypalButtonClick = () => {
        handlePaymentMethodChange("PAYPAL");
        form.handleSubmit(onSubmit)();
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isLoading) return; // Prevent multiple submissions
        setIsLoading(true);
        
        const orderData: OrderRequest = {
            address: {
                addressDetail: values.address,
                city: values.city,
                phoneNumber: values.phone,
                email: defaultValues.email,
            },
            orderItems: data?.cartItemResponses?.map((item: CartItemResponse) => ({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                totalPrice: item.price,
                productImage: item.urlImageThumbnail
            })) || [],
            totalPrice: data?.totalPrice || 0,
            voucher: "",
            discount: 0,
            shippingFee: 0,
            shippingMethod: "standard",
            paymentMethod: values.paymentMethod,
            paymentStatus: "PENDING",
            note: "note",
            status: "PENDING"
        }
        try {
            if (values.paymentMethod === "COD" || values.paymentMethod === "TRANSFER") {
                const response = await createOrder(token, orderData);
                if (response) {
                    toast({
                        title: "Order successfully",
                    });
                    router.push("/account/orders");
                } else {
                    toast({
                        variant: "destructive",
                        title: "Order failed, please try again",
                    });
                    throw new Error(`handleCheckout Request failed with status code`);
                }
            }
            else if (values.paymentMethod === "PAYPAL") {
                console.log("Initiating PayPal checkout with order data:", orderData);
                
                try {
                    console.log("Creating PayPal order...");
                    const response = await createOrderWithPayPal(token, orderData);
                    console.log("PayPal response:", response);
                    
                    // Try multiple possible locations for the PayPal URL
                    const redirectUrl = response?.linkPaypalToExecute || response?.link;
                    
                    if (redirectUrl) {
                        console.log("PayPal redirect URL found:", redirectUrl);
                        // Show success toast before redirecting
                        toast({
                            title: "Redirecting to PayPal",
                            description: "You will be redirected to complete payment."
                        });
                        
                        // Give the toast time to appear before redirecting
                        setTimeout(() => {
                            window.location.href = redirectUrl;
                        }, 1000);
                        return;
                    } else {
                        // No redirect URL found in the response
                        console.error("No PayPal redirect URL found in response:", response);
                        
                        // Try to provide more useful error information
                        let errorDetail = "Server response did not contain a redirect URL";
                        if (response.error) {
                            errorDetail = `Error (${response.status}): ${response.message || "Unknown error"}`;
                        }
                        
                        toast({
                            variant: "destructive",
                            title: "PayPal Checkout Error",
                            description: `Unable to get PayPal checkout URL. ${errorDetail}`
                        });
                    }
                } catch (error) {
                    console.error('Error during PayPal checkout:', error);
                    
                    let errorMessage = "An unexpected error occurred during PayPal checkout";
                    if (error instanceof Error) {
                        errorMessage = error.message;
                    } else if (typeof error === 'object' && error !== null) {
                        errorMessage = JSON.stringify(error);
                    }
                    
                    toast({
                        variant: "destructive",
                        title: "PayPal Checkout Failed",
                        description: errorMessage
                    });
                }
            }

        } catch (error) {
            console.error('Error during checkout:', error);
            
            // More detailed error information
            let errorMessage = "An unexpected error occurred";
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'object' && error !== null) {
                errorMessage = JSON.stringify(error);
            }
            
            toast({
                variant: "destructive",
                title: "Error during checkout",
                description: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <div className="flex justify-start w-full my-3 mb-4">
                <Link href={"/cart"} className="flex justify-between items-center    ">
                    <Icons.chevronLeft width={20} height={20} className="text-blue-600"/>
                    <span className="text-base text-blue-600">Back to cart</span>
                </Link>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div
                        className="flex flex-col-reverse lg:flex-row justify-between  items-center lg:items-start gap-5 w-full">
                        <div className="w-3/5 flex flex-col gap-5">
                            <div className="flex flex-col gap-2 rounded-xl border">
                                <div className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                                    <span className="text-base font-semibold">Product in bill ({data?.quantity})</span>
                                </div>
                                <div className="p-2 flex flex-col">
                                    {data && data.cartItemResponses.map((item: CartItemResponse, index) => (
                                        <div key={item.id} className="w-full p-2 border-b border-gray-200 ">
                                            <Link href={`/${item.productSlug}`}>
                                                <div className="flex gap-4 justify-between items-center w-full h-20">
                                                    <div className="w-1/12">
                                                        <Image src={item.urlImageThumbnail} alt={item.productName}
                                                               width={60}
                                                               height={60}
                                                               className="w-full object-contain"/>
                                                    </div>
                                                    <div className="w-11/12 flex justify-center items-center gap-2">
                                                        <div className="flex flex-col gap-1 w-full">
                                                    <span
                                                        className="text-md font-semibold hover:text-primaryred line-clamp-2">
                                                        {item.productName}
                                                    </span>
                                                            <div
                                                                className="flex justify-between gap-2 items-center w-1/5">
                                                        <span className="text-md  text-primaryred">
                                                            $ {item.price}
                                                        </span>
                                                            </div>

                                                        </div>
                                                        <div
                                                            className="w-24 p-1 flex justify-center items-center bg-gray-200 rounded-xl text-xs">
                                                            <div>
                                                                {productOption?.[index]}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center items-center gap-1">
                                                    <span className="block">
                                                        x
                                                    </span>
                                                            {item.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex flex-col gap-2 rounded-xl border ">
                                    <div
                                        className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                                        <span className="text-base font-semibold">Shipping Address</span>
                                        <Button variant="ghost" className="text-primaryred rounded-xl">Change</Button>
                                    </div>
                                    <div className="p-2 flex flex-col gap-4">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Full name" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Address detail</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Address detail" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="city"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 rounded-xl border ">
                                    <div
                                        className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                                        <span className="text-base font-semibold">Payment Method</span>
                                        <Button variant="ghost" className="text-primaryred rounded-xl">Change</Button>
                                    </div>
                                    <div className="p-2">
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex flex-col justify-center items-start gap-3">
                                                            <Label className="flex justify-start items-center h-10">
                                                                <Input
                                                                    type="radio"
                                                                    checked={field.value === "COD"}
                                                                    onChange={() => handlePaymentMethodChange("COD")}
                                                                    className={"w-4 h-4"}
                                                                />
                                                                <span className="ml-2">COD</span>
                                                                <Image
                                                                    src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-pngtree-cash-on-delivery-bagde-olshop-png-image_3381308-removebg-preview.png"}
                                                                    alt={""} width={20} height={20}
                                                                    className="w-10 object-contain mx-2"/>
                                                            </Label>

                                                            <Label className="flex justify-start items-center h-10">
                                                                <Input
                                                                    type="radio"
                                                                    checked={field.value === "TRANSFER"}
                                                                    onChange={() => handlePaymentMethodChange("TRANSFER")}
                                                                    className={"w-4 h-4"}
                                                                />
                                                                <span className="ml-2">Transfer</span>
                                                                <Image
                                                                    src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/oralie-file-png.monster-483.png"}
                                                                    alt={""} width={20} height={20}
                                                                    className="w-10 object-contain mx-2"/>
                                                            </Label>
                                                            {field.value === "TRANSFER" && (
                                                                <div className="mt-2">
                                                                    <Image
                                                                        src="https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/2560px-PayPal.svg.png"
                                                                        alt="QR Code for bank transfer"
                                                                        width={200}
                                                                        height={200}
                                                                    />
                                                                </div>
                                                            )}

                                                            <Label className="flex justify-start items-center h-10">
                                                                <Input
                                                                    type="radio"
                                                                    checked={field.value === "PAYPAL"}
                                                                    onChange={() => handlePaymentMethodChange("PAYPAL")}
                                                                    className={"w-4 h-4"}
                                                                />
                                                                <span className="ml-2">Paypal</span>
                                                                <Image
                                                                    src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/2560px-PayPal.svg.png"}
                                                                    alt={""} width={20} height={20}
                                                                    className="w-10 object-contain mx-2"/>
                                                            </Label>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-2/5 rounded-xl">
                            <div className="w-full flex flex-col gap-2">
                                <Card className="w-full">
                                    <CardContent className="flex w-full justify-between items-center p-2">
                                        <div className="w-full flex-col gap-2 space-y-4 justify-between items-center">
                                            <div>
                                                <h2 className="text-lg font-semibold">Order Information</h2>
                                            </div>
                                            <div
                                                className="w-full pb-2 flex justify-between items-center border-b border-dashed border-gray-400">
                                                <p className="text-sm">Total</p>
                                                <div className="text-lg font-semibold">$ {data?.totalPrice}</div>
                                            </div>
                                            <div
                                                className="flex flex-col space-y-2 pb-2 border-b border-dashed border-gray-400">
                                                <div className="w-full flex justify-between items-center">
                                                    <p className="text-sm">Total Promotion</p>
                                                    <div className="text-lg font-semibold">$ {data?.totalPrice}</div>
                                                </div>
                                                <div className="w-full flex justify-between items-center">
                                                    <p className="text-sm">Shipping Fee</p>
                                                    <div className="text-sm font-base">Free</div>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between items-center">
                                                <p className="text-sm">Need to Pay</p>
                                                <div className="text-lg font-semibold">$ {data?.totalPrice}</div>
                                            </div>
                                            <Button type="submit"
                                                    className="w-full h-10 bg-primaryred hover:bg-red-500 text-white"
                                                    disabled={isLoading}>
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    "Order Now"
                                                )}
                                            </Button>
                                            <Button type="button"
                                                    className="w-full h-10 bg-paypal hover:bg-paypal1 text-white"
                                                    onClick={handlePaypalButtonClick}
                                                    disabled={isLoading}>
                                                {isLoading ? (
                                                    <div className="flex items-center justify-center">
                                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                                        Processing...
                                                    </div>
                                                ) : (
                                                    <Image
                                                        src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/2560px-PayPal.svg.png"}
                                                        alt={""} width={420} height={120} className="w-24 object-contain"/>
                                                )}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CheckoutTemplate;