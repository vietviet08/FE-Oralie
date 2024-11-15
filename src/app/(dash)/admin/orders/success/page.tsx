"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { successPaypalPayment } from "@/services/OrderService";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/constants/data";

export default function PaymentSuccess() {
  const { data: session } = useSession();
  const token = session?.access_token;

  const searchParams = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const PayerID = searchParams.get("PayerID");

  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSuccessPaypalPayment() {
      if (paymentId && PayerID && token) {
        try {
          const resMessage = await successPaypalPayment(
            token,
            paymentId,
            PayerID
          );
          setMessage(resMessage);
        } catch (error) {
          console.error("Error confirming payment:", error);
          setMessage(ERROR_MESSAGE);
        }
      }
    }

    fetchSuccessPaypalPayment();
  }, [paymentId, PayerID, token]);

  return (
    <div>
      {message === SUCCESS_MESSAGE && (
        <div>Thank you! Your payment was successful.</div>
      )}
      {message === ERROR_MESSAGE && (
        <div>Sorry, there was an error with your payment.</div>
      )}
      {message === "" && <div>Processing payment...</div>}
    </div>
  );
}
