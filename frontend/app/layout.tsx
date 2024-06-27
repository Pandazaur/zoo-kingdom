'use client'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'
import { dmSans } from '@/lib/fonts'
import Providers from '@/components/Providers'

function MyApp({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Zoo Kingdom: The Web3 virtual zoo</title>
            </head>
            <body className={`bg-amber-100 ${dmSans.className}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}

export default MyApp
