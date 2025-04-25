'use client'

import { SessionProvider } from 'next-auth/react';

interface props {
    children: React.ReactNode
}

export const AuthContext = ({ children }: props) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}
