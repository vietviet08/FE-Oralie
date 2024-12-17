"use client";

import Link from "next/link";
import {Icons} from "@/components/icons";
import {CartItemResponse} from "@/model/cart/CartItemResponse";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {CartResponse} from "@/model/cart/CartResponse";
import {createOrderWithPayPal} from "@/services/OrderService";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";

const CheckoutTemplate = ({data}: { data: CartResponse }) => {

    const {data: session} = useSession();
    const token = session?.access_token as string;

    const router = useRouter();

    const handleCheckout = async () => {
        const orderData = {
            address: {
                addressDetail: "Tan Phu",
                city: "HCM",
                phoneNumber: "09090909",
                email: "email@gmail.com"
            },
            orderItems: [{
                productId: 123,
                productName: "productName",
                quantity: 2,
                totalPrice: 500
            }],
            totalPrice: 500,
            voucher: "",
            discount: 0,
            shippingFee: 0,
            shippingMethod: "standard",
            paymentMethod: "PAYPAL",
            paymentStatus: "PENDING",
            note: "note",
            status: "PENDING"
        }

        try {
            const response = await createOrderWithPayPal(token, orderData);
            if (response) {
               router.push(response.linkPaypalToExecute);
            } else {
                throw new Error(`handleCheckout Request failed with status code`);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="sm:px-32 px-6 py-6 mt-14">
            <div className="flex justify-start w-full my-3 mb-4">
                <Link href={"/cart"} className="flex justify-between items-center    ">
                    <Icons.chevronLeft width={20} height={20} className="text-blue-600"/>
                    <span className="text-base text-blue-600">Back to cart</span>
                </Link>
            </div>
            <div
                className="flex flex-col-reverse lg:flex-row justify-between  items-center lg:items-start gap-5 w-full">
                <div className="w-3/5 flex flex-col gap-5">
                    <div className="flex flex-col gap-2 rounded-xl border">
                        <div className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                            <span className="text-base font-semibold">Product in bill (9)</span>
                        </div>
                        <div className="p-2 flex flex-col">
                            {data && data.cartItemResponses.map((item: CartItemResponse) => (
                                <div key={item.id} className="w-full h-[calc(4rem+)10px] p-2 border-b border-gray-200">
                                    <Link href={`/${item.productSlug}`}>
                                        <div className="flex gap-2 justify-between items-center w-full">
                                            <div className="w-2/12">
                                                <Image src={item.urlImageThumbnail} alt={item.productName} width={120}
                                                       height={120}
                                                       className="w-full object-contain"/>
                                            </div>
                                            <div className="w-10/12">
                                                <div className="flex flex-col gap-1 w-full">
                                                <span
                                                    className="text-sm font-semibold hover:text-primaryred line-clamp-2">
                                                    {item.productName}
                                                </span>
                                                    <div className="flex justify-between gap-2 items-center w-1/5">
                                                        <span className="text-md font-bold text-primaryred">
                                                            ${item.price}
                                                        </span>
                                                        {/*{*/}
                                                        {/*    item.discount > 0 && (*/}
                                                        {/*        <span*/}
                                                        {/*            className="text-sm text-gray line-through text-gray-400">${item.price}</span>*/}
                                                        {/*    )*/}
                                                        {/*}*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl border ">
                        <div className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                            <span className="text-base font-semibold">Shipping Address</span>
                            <Button variant="ghost" className="text-primaryred rounded-xl">Change</Button>
                        </div>
                        <div className="p-2">
                            <p className="text-sm font-semibold">Name</p>
                            <p className="text-sm">Nguyen Van A</p>
                            <p className="text-sm font-semibold">Phone</p>
                            <p className="text-sm">0123456789</p>
                            <p className="text-sm font-semibold">Address</p>
                            <p className="text-sm">123 Nguyen Van Linh, Da Nang</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 rounded-xl border ">
                        <div className="w-full flex justify-between items-center p-2 bg-gray-100 rounded-t-xl">
                            <span className="text-base font-semibold">Payment Method</span>
                            <Button variant="ghost" className="text-primaryred rounded-xl">Change</Button>
                        </div>
                        <div className="p-2">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Icons.product width={22} height={22}/>
                                    <span className="text-lg font-semibold">Credit Card</span>
                                </div>
                                <div className="text-sm font-semibold">**** **** **** 1234</div>
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
                                        <div className="text-lg font-semibold">$ 9999</div>
                                    </div>
                                    <div
                                        className="flex flex-col space-y-2 pb-2 border-b border-dashed border-gray-400">
                                        <div className="w-full flex justify-between items-center">
                                            <p className="text-sm">Total Promotion</p>
                                            <div className="text-lg font-semibold">$ 9999</div>
                                        </div>
                                        <div className="w-full flex justify-between items-center">
                                            <p className="text-sm">Shipping Fee</p>
                                            <div className="text-sm font-base">Free</div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-between items-center">
                                        <p className="text-sm">Need to Pay</p>
                                        <div className="text-lg font-semibold">$ 9999</div>
                                    </div>
                                    <Button type="button"
                                            className="w-full h-10 bg-primaryred hover:bg-red-500 text-white ">
                                        Order Now
                                    </Button>
                                    <Button type="button"
                                            className="w-full h-10 bg-paypal hover:bg-paypal1 text-white "
                                            onClick={handleCheckout}>
                                        <Image
                                            src={"https://oralie-bucket.s3.ap-southeast-1.amazonaws.com/2560px-PayPal.svg.png"}
                                            alt={""} width={420} height={120} className="w-24 object-contain"/>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutTemplate;