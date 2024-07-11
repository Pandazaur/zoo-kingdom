'use client'

import React, { useMemo, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { contractMainInfos as mainAnimalContractInfos } from '@/lib/contracts/useAnimalContract'
import { RaceMetadata } from '@/types/Race.type'
import { Gender } from '@/lib/animal'
import AnimalInfos from './AnimalInfos'
import { toast } from 'sonner'

type Props = {
    tokenId: bigint
    raceMetadata?: RaceMetadata
    animal: {
        tokenId: bigint
        race: {
            id: string
            maxChildrenCount: bigint
            metadataUri: string
        }
        childCount: bigint
        gender: Gender
    }
    onBreeded?: () => unknown
}

export default function ModalBreed(props: Props) {
    const [open, setOpen] = useState(false)
    const account = useAccount()

    const [breedWithAnimalId, setBreedWithAnimalId] = useState<string | null>(null)

    const { data: animalList } = useReadContract({
        ...mainAnimalContractInfos,
        functionName: 'getAnimalsForAddress',
        args: [account.address!],
        query: {
            enabled: !!account.address,
        },
    })

    const breedableAnimals = useMemo(() => {
        if (!animalList) {
            return []
        }

        return animalList.filter((animalFromList) => {
            return (
                animalFromList.gender !== props.animal.gender &&
                animalFromList.race.id === props.animal.race.id &&
                animalFromList.tokenId !== props.animal.tokenId
            )
        })
    }, [animalList, props.animal])

    const canBreed = useMemo(() => {
        return props.animal.childCount < props.animal.race.maxChildrenCount
    }, [props.animal])

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                setOpen(false)
                props.onBreeded?.()
                toast.success('New baby is born !')
            },
            onError: (e: any) => {
                const errorText =
                    e.cause?.data?.errorName === 'MaxChildrenReached'
                        ? 'Max children reached for an animal'
                        : e.shortMessage
                toast.error(errorText)
                console.error({ e })
            },
        },
    })

    const onBreed = () => {
        if (!breedWithAnimalId) {
            return null
        }

        writeContract({
            ...mainAnimalContractInfos,
            functionName: 'breedAnimals',
            args: [props.animal.tokenId, BigInt(breedWithAnimalId)],
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full" disabled={!canBreed}>
                <Button className="w-full" disabled={!canBreed}>
                    Breed
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Breed animal</DialogTitle>
                    <DialogDescription className="text-black">
                        <AnimalInfos animal={props.animal} />
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Breed with</label>
                            <select
                                value={breedWithAnimalId?.toString()}
                                onInput={(e) => {
                                    setBreedWithAnimalId((e.target as HTMLSelectElement).selectedOptions?.[0].value)
                                }}
                                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-amber-600 sm:text-sm sm:leading-6"
                            >
                                <option selected value={undefined} disabled>
                                    Select an animal
                                </option>
                                {breedableAnimals.map((breedableAnimal) => (
                                    <option key={breedableAnimal.tokenId} value={breedableAnimal.tokenId.toString()}>
                                        {breedableAnimal.race.id} #{breedableAnimal.tokenId.toString()} (Children:{' '}
                                        {breedableAnimal.childCount.toString()} /{' '}
                                        {breedableAnimal.race.maxChildrenCount.toString()})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button className="mt-4 w-full" onClick={onBreed} isPending={isPending} disabled={!canBreed}>
                            Breed
                        </Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
