"use client";

import LoginTemplate from "@/components/store/account/template/login-template";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const LoginPage: React.FC = () => {
    // const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        } else {
            signIn(`keycloak`);
        }
    }, [status, router]);

    return <LoginTemplate/>;
};

export default LoginPage;
