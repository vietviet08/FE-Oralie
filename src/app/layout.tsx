import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { ThemeProvider } from "@/components/common/theme-provider";
import React from "react";
import SessionGuard from "@/components/SessionGuard";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
    <html lang="en">
      <head>
        <link rel="icon" href="/images/oralie.ico" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <SessionProviderWrapper>
          <SessionGuard>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionGuard>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
