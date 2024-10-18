"use client";

import LoginTemplate from "@/components/store/account/template/login-template";
import {signIn, signOut, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const LoginPage: React.FC = () => {
    const {data: session, status} = useSession();
    const router = useRouter();

    // useEffect(() => {
    //   if (status === "authenticated") {
    //     router.push("/");
    //   }
    // }, [status, router]);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        } else {
            signIn(`${process.env.KEYCLOAK_STORE_CLIENT_ID}`);
        }
    }, [status, router]);

    return <LoginTemplate/>;
};

export default LoginPage;
