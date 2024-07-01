'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import { useReadAnimalContract } from '@/lib/contracts/useAnimalContract'
import AnimalCard from '@/components/shared/animal/AnimalCard'

type Props = {}

export default function AnimalsPage(props: Props) {
    const { address } = useAccount()
    const { data: myAnimals, isLoading } = useReadAnimalContract('getAnimalsForAddress', [address])

    const renderMyAnimals = () => {
        if (isLoading) {
            return 'Loading ...'
        }

        return (
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                {myAnimals?.map((animal) => <AnimalCard animal={animal} />)}
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
