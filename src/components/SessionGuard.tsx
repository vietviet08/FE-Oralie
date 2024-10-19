"use client"

import {useSession, signIn} from "next-auth/react";
import {ReactNode, useEffect} from "react";
import {OrbitProgress} from "react-loading-indicators";

export default function SessionGuard({children}: { children: ReactNode }) {
    const {data: session, status} = useSession();

    useEffect(() => {
        if (session?.error === "RefreshAccessTokenError") {
            signIn("keycloak").then((r) => {
                console.log(r)
            });
        }
    }, [session]);

    if (status === "loading") {
        return <div className={"flex justify-center items-center h-screen"}>
            <OrbitProgress color="#DA2119" size="small" text="" textColor=""/>
        </div>
    }

    return <>{children}</>;
}