'use client'

import { SessionProvider } from 'next-auth/react'
import React from "react";

export default function SessionProviderWrapper({ children }: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider refetchInterval={4 * 60}>
            {children}
        </SessionProvider>
    )
}