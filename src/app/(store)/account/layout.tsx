import type {Metadata} from "next";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import SideBarAccountStore from "@/components/store/account/sidebar";

export const metadata: Metadata = {
    title: "Account Management",
    description: "The ecommerce platform for the future",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <NextTopLoader showSpinner={true} color={"#f1e2e2"}/>
            <main className="w-full flex-1 overflow-hidden">
                <SideBarAccountStore>{children}</SideBarAccountStore>
            </main>
        </div>
    );
}