import { useReadContract, useWriteContract } from 'wagmi'
import AnimalNFT from '@/artifacts/contracts/AnimalNFT.sol/AnimalNFT.json'

export const contractMainInfos = {
    abi: AnimalNFT.abi,
    address: process.env.NEXT_PUBLIC_ANIMAL_CONTRACT_ADDRESS,
}

export function useReadAnimalContract(functionName: string, args?: unknown[]) {
    return useReadContract({
        ...contractMainInfos,
        functionName,
        args,
    })
}
