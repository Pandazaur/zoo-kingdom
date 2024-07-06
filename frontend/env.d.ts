namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_ENV: 'localhost' | 'testnet' | 'mainnet'
        NEXT_PUBLIC_ANIMAL_CONTRACT_ADDRESS: `0x{string}`
        NEXT_PUBLIC_MARKETPLACE_ADDRESS: `0x{string}`
        NEXT_PUBLIC_ZOOPASS_ADDRESS: `0x{string}`
    }
}
