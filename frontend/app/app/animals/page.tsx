'use client'
import React from 'react'
import AnimalRace from '@/components/shared/animal/AnimalRace'
import { useReadContract } from 'wagmi'
import { contractMainInfos } from '@/lib/contracts/useAnimalContract'

export default function AnimalsPage() {
    const { data: races, isLoading } = useReadContract({
        ...contractMainInfos,
        functionName: 'getRaces',
    })

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
            {isLoading ? <p>Loading</p> : races?.map((race) => <AnimalRace race={race} key={race.id} />)}
        </div>
    )
}
