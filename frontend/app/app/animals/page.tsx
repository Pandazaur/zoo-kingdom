'use client'
import React from 'react'
import { useReadAnimalContract } from '@/lib/contracts/useAnimalContract'
import AnimalRace from '@/components/shared/animal/AnimalRace'

type Props = {}

export default function AnimalsPage(props: Props) {
    const { data: races, isLoading } = useReadAnimalContract('getRaces')

    console.log({ races })

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
            {isLoading ? <p>Loading</p> : races?.map((race) => <AnimalRace race={race} key={race.id} />)}
        </div>
    )
}
