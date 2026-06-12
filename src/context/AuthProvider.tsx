'use client'

import { SessionProvider } from "next-auth/react"
import React from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "@/store/store"

export default function AuthProvider({
    children,

}: { children: React.ReactNode }) {
    return (
        <ReduxProvider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ReduxProvider>
    )
}

