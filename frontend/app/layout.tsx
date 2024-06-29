'use client'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { Toaster } from '@/components/ui/sonner'
import { dmSans } from '@/lib/fonts'
import Providers from '@/components/Providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Zoo Kingdom: The Web3 virtual zoo</title>
                <link rel="icon" type="image/png" href="/images/zoo-kingdom-logo.png" />
            </head>
            <body className={`bg-amber-100 ${dmSans.className}`}>
                <Providers>{children}</Providers>
                <Toaster />
            </body>
        </html>
    )
}
