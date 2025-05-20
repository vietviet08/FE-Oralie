"use client";

import LoginTemplate from "@/components/store/account/template/login-template";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {parseJwt} from "@/utils/encryption";

const LoginPage: React.FC = () => {
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            // Log token information for debugging
            if (session?.access_token) {
                try {
                    const tokenInfo = parseJwt(session.access_token);
                    console.log("Authenticated user token:", {
                        sub: tokenInfo.sub,
                        roles: tokenInfo.realm_access?.roles || [],
                        exp: new Date(tokenInfo.exp * 1000).toLocaleString(),
                        tokenBrief: session.access_token.substring(0, 20) + "..."
                    });
                } catch (e) {
                    console.error("Error parsing token", e);
                }
            }
            router.push("/");
        } else {
            signIn(`keycloak`);
        }
    }, [status, router, session]);

    return <LoginTemplate/>;
};

export default LoginPage;
