"use client"

import { useSession, signIn } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export default function SessionGuard({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession(); // No need to redefine the type of data

    useEffect(() => {
        // Check if data is defined and has an error
        if (session?.error === "RefreshAccessTokenError") {
            signIn("keycloak");
        }
    }, [session]);

    // Optionally, handle loading state or redirect unauthorized users here
    if (status === "loading") {
        return <div>Loading...</div>; // You can customize this as needed
    }

    return <>{children}</>;
}