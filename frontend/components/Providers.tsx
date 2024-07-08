'use client'
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { arbitrum, arbitrumSepolia, hardhat } from 'wagmi/chains'
import { getDefaultConfig, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'

const chains = {
    localhost: [hardhat],
    testnet: [arbitrumSepolia],
    mainnet: [arbitrum],
}

type Props = {
    children: React.ReactNode
}
const client = new QueryClient()
const config = getDefaultConfig({
    appName: 'RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    /* @ts-ignore */
    chains: chains[process.env.NEXT_PUBLIC_ENV],
    ssr: true,
})

export default function Providers(props: Props) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider theme={lightTheme({ accentColor: 'hsl(var(--primary))' })}>
                    {props.children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
