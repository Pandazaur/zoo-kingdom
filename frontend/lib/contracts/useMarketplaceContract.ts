import { abi } from '@/artifacts/contracts/Marketplace.sol/Marketplace.json'

export const contractMainInfos = {
    abi,
    address: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
}
