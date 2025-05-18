"use client";

import {useSession} from "next-auth/react";

export default function TokenUserStore() {
    const {data: session} = useSession();
    const token = session?.access_token as string;

    return (
        <div className="">
            <span className="w-3/5 break-words">
                {token}
            </span>
        </div>
    );
}
