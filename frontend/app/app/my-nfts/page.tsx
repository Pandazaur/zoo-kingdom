'use client'
import React from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { animalNftAbi } from '@/contracts'
import AnimalCard from '@/components/shared/animal/AnimalCard'

type Props = {}

export default function AnimalsPage(props: Props) {
    const { address } = useAccount()
    const {
        data: myAnimals,
        isLoading,
        error,
        refetch,
    } = useReadContract({
        abi: animalNftAbi,
        address: process.env.NEXT_PUBLIC_ANIMAL_CONTRACT_ADDRESS,
        functionName: 'getAnimalsForAddress',
        args: [address!],
        query: {
            enabled: () => !!address,
        },
    })

    console.log({ error, myAnimals, isLoading })

    const renderMyAnimals = () => {
        if (isLoading) {
            return 'Loading ...'
        }

        return (
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                {myAnimals?.map((animal) => (
                    <AnimalCard animal={animal} key={animal.tokenId} onBreeded={() => refetch()} />
                ))}
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-medium mb-6">My NFTs</h1>
            {renderMyAnimals()}
        </div>
    )
}
