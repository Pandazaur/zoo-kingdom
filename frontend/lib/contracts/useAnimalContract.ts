import { animalNftAbi } from '@/contracts'

export const contractMainInfos = {
    abi: animalNftAbi,
    address: process.env.NEXT_PUBLIC_ANIMAL_CONTRACT_ADDRESS,
}
