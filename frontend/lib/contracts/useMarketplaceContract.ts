import { marketplaceAbi } from '@/contracts'

export const contractMainInfos = {
    abi: marketplaceAbi,
    address: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
} as const
