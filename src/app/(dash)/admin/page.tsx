"use client";

import {useEffect} from "react";
import {signIn} from "next-auth/react";

export default function Home() {
    // useEffect(() => {
    //     signIn(`${process.env.KEYCLOAK_DASH_CLIENT_ID}`)
    //         .then(r => console.log(r));
    // }, []);
    return (
        <div>
            <h1>Page Admin</h1>
        </div>
    );
}
