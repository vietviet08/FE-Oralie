import type {Metadata} from "next";
import React from "react";
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "@/components/ui/toaster";
import Sidebar from "@/components/dash/sidebar";
import Header from "@/components/dash/header";

export const metadata: Metadata = {
    title: "Dashboards - Oralie",
    description: "The ecommerce platform for the future",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <NextTopLoader showSpinner={false}/>
            <Toaster/>
            <Sidebar/>
            <main className="w-full flex-1 overflow-hidden">
                <Header/>
                {children}
            </main>
        </div>
    );
}

