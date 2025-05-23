import type {Metadata} from "next";
import {Header} from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import React from "react";
import ScrollToTop from "@/components/store/ScrollToTop";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
    title: "Oralie",
    description: "The ecommerce platform for the future",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Header/>
            <NextTopLoader showSpinner={false} color={"#f1e2e2"}/>
            <main className="w-full flex-1 overflow-hidden">
                {children}
            </main>
            <ScrollToTop/>
            <Footer/>
        </div>
    );
}