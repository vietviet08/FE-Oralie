import type { Metadata } from "next";
import { Header } from "@/components/store/Header";
import Footer from "@/components/store/Footer";
import React from "react";

export const metadata: Metadata = {
  title: "Login & Signup",
  description: "The ecommerce platform for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
