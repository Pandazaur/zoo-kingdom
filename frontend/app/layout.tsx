'use client'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { dmSans, gluten } from '@/lib/fonts'

const config = getDefaultConfig({
    appName: 'RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: true,
})

const client = new QueryClient()

function MyApp({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Zoo Kingdom: The Web3 virtual zoo</title>
            </head>
            <body className={`bg-amber-100 ${dmSans.className}`}>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={client}>
                        <RainbowKitProvider>{children}</RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    )
}

export default MyApp
