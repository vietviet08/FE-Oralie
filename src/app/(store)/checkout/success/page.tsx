"use client"

import {useEffect, useState} from "react";
import {successPaypalPayment} from "@/services/OrderService";
import {useSession} from "next-auth/react";
import {Icons} from "@/components/icons";
import {useRouter} from "next/navigation";
import Link from "next/link";
import NotFound from "@/app/not-found";

const CheckoutSuccessPage = () => {

    const {data: session} = useSession();
    const token = session?.access_token as string;

    const [paymentId, setPaymentId] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        console.log(paymentId);
        const PayerID = urlParams.get('PayerID');
        console.log(PayerID);
        if (paymentId && PayerID) {
            handlePaymentSuccess(paymentId, PayerID);
        }
    }, []);

    const handlePaymentSuccess = async (paymentId: string, PayerID: string) => {
        try {
            const response = await successPaypalPayment(token, paymentId, PayerID);
            if (response) {
                console.log(response);
                setPaymentId(response.id);
            } else {
                throw new Error(`handlePaymentSuccess Request failed with status code`);
                router.push("/");
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    }

    return (
        paymentId !== "" ? (
            <div className="flex justify-center items-center gap-3 h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center">

                        <Icons.badgeCheck className="text-green-500 w-20 h-20"/>
                        <h1 className="text-3xl font-semibold">Payment success, thank you for your order!</h1>
                    </div>
                    <div>
                        <span className="text-base text-primaryred">Order id: {paymentId}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-sm p-0 m-0">
                            Please check your email for order confirmation.
                        </p>
                        <Link href={"/account/orders"} className="text-sm text-blue-600">Here</Link>
                    </div>
                </div>
            </div>
        ) : <NotFound/>
    );
}

export default CheckoutSuccessPage;