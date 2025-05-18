"use client"

import {useEffect, useState} from "react";
import {successPaypalPayment} from "@/services/OrderService";
import {useSession} from "next-auth/react";
import {Icons} from "@/components/icons";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";

const CheckoutSuccessPage = () => {
    const {data: session} = useSession();
    const token = session?.access_token as string;
    const [paymentId, setPaymentId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const {toast} = useToast();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentId = urlParams.get('paymentId');
        const PayerID = urlParams.get('PayerID');
        
        console.log("PaymentId:", paymentId);
        console.log("PayerID:", PayerID);
        console.log("Token available:", !!token);

        if (paymentId && PayerID && token) {
            handlePaymentSuccess(paymentId, PayerID);
        } else if (!token) {
            // Wait for token to be available
            console.log("Waiting for session token...");
        } else {
            setLoading(false);
            setError('Invalid payment parameters');
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: "Invalid payment parameters received"
            });
        }
    }, [token, toast]);

    const handlePaymentSuccess = async (paymentId: string, PayerID: string) => {
        try {
            console.log("Confirming payment with backend via service...");
            const response = await successPaypalPayment(token, paymentId, PayerID);
            console.log("Backend confirmation response:", response);
            
            if (response) {
                setPaymentId(response.id || response.orderId || paymentId);
                toast({
                    title: "Payment Successful",
                    description: response.cartCleared 
                        ? "Your order has been placed successfully and your cart has been cleared!"
                        : "Your order has been placed successfully!"
                });
                setLoading(false);
                return; // Exit early if successful
            } else {
                throw new Error(`Payment confirmation failed - no response data`);
            }
        } catch (primaryError) {
            console.error('Payment confirmation failed via service:', primaryError);
            
            // Try alternative direct approach
            try {
                console.log("Trying direct API call approach for confirmation...");
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
                const directUrl = `${apiBaseUrl}/api/orders/store/orders/checkout/success?paymentId=${paymentId}&PayerID=${PayerID}`;
                console.log("Direct success API URL:", directUrl);
                
                const directResponse = await fetch(directUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!directResponse.ok) {
                    throw new Error(`Direct API call failed: ${directResponse.status} ${directResponse.statusText}`);
                }
                
                const directData = await directResponse.json();
                console.log("Direct API confirmation response:", directData);
                
                setPaymentId(directData.id || directData.orderId || paymentId);
                toast({
                    title: "Payment Successful",
                    description: directData.cartCleared 
                        ? "Your order has been placed successfully and your cart has been cleared!"
                        : "Your order has been placed successfully!"
                });
                setLoading(false);
                return;
            } catch (directError) {
                console.error('Direct API call approach failed:', directError);
                // Continue to error handling
            }
            
            // Error handling for both approaches
            const errorMessage = primaryError instanceof Error ? primaryError.message : 'Unknown error';
            setError(`Payment confirmation failed. Error: ${errorMessage}`);
            toast({
                variant: "destructive",
                title: "Payment Error",
                description: `Failed to confirm your payment: ${errorMessage}`
            });
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-4">
                    <Icons.spinner className="h-8 w-8 animate-spin" />
                    <p>Processing your payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center gap-3 h-screen">
                <div className="flex flex-col justify-center items-center space-y-4">
                    <div className="flex justify-center items-center gap-3">
                        <Icons.warning className="text-red-500 w-16 h-16" />
                        <h1 className="text-2xl font-semibold">Payment Error</h1>
                    </div>
                    <p className="text-gray-500 text-center max-w-md">
                        {error}
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Button 
                            onClick={() => router.push("/checkout")}
                            className="bg-primaryred hover:bg-red-600"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        paymentId !== "" ? (
            <div className="flex justify-center items-center gap-3 h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center gap-4">
                        <Icons.badgeCheck className="text-green-500 w-16 h-16"/>
                        <h1 className="text-3xl font-semibold">Payment success, thank you for your order!</h1>
                    </div>
                    <div className="mt-4 mb-2">
                        <span className="text-base text-primaryred">Order id: {paymentId}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-sm p-0 m-0 mb-2">
                            Please check your email for order confirmation.
                        </p>
                        <p className="text-sm p-0 m-0 mb-2 text-green-600">
                            Your cart has been cleared.
                        </p>
                        <Link href="/account/orders" className="text-base text-blue-600 hover:underline">
                            View Your Orders
                        </Link>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default CheckoutSuccessPage;