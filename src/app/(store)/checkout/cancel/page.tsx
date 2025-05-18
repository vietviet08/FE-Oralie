"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

const CancelPaymentPage = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center gap-3 h-screen">
            <div className="flex flex-col justify-center items-center space-y-4">
                <div className="flex justify-center items-center gap-3">
                    <Icons.close className="text-red-500 w-16 h-16" />
                    <h1 className="text-2xl font-semibold">Payment Cancelled</h1>
                </div>
                <p className="text-gray-500 text-center max-w-md">
                    Your PayPal payment was cancelled. You can try again or choose a different payment method.
                </p>
                <div className="flex gap-4 mt-4">
                    <Button 
                        variant="outline" 
                        onClick={() => router.push("/cart")}
                        className="flex items-center gap-2"
                    >
                        <Icons.shoppingCart className="w-4 h-4" />
                        Return to Cart
                    </Button>
                    <Button 
                        onClick={() => router.push("/checkout")}
                        className="bg-primaryred hover:bg-red-600 flex items-center gap-2"
                    >
                        <Icons.billing className="w-4 h-4" />
                        Try Again
                    </Button>
                </div>
                <div className="mt-2">
                    <Link href="/" className="text-sm text-blue-600 hover:underline">
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CancelPaymentPage;