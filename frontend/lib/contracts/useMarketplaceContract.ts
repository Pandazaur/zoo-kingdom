import Marketplace from '@/artifacts/contracts/Marketplace.sol/Marketplace.json'

export const contractMainInfos = {
    abi: Marketplace.abi,
    address: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
}
