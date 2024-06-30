namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_ENV: 'localhost' | 'testnet' | 'mainnet'
        NEXT_PUBLIC_ANIMAL_CONTRACT_ADDRESS: `0x{string}`
    }
}