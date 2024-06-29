'use client'
import React from 'react'
import Image from 'next/image'
import { useWriteContract } from 'wagmi'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import useMetadata from '@/lib/hooks/useMetadata'
import { convertIpfsToHttps } from '@/lib/strings'
import { RaceMetadata } from '@/types/Race.type'
import { grandstander } from '@/lib/fonts'

import { contractMainInfos } from '@/lib/contracts/useAnimalContract'

type Props = {
    race: {
        id: string
        maxChildrenCount: BigInt
        metadataUri: string
    }
}

export default function AnimalRace(props: Props) {
    const { data: metadata } = useMetadata<RaceMetadata>(props.race.metadataUri)
    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast('Minted !', {
                    description: `You now have a new ${metadata?.name || props.race.id}`,
                })
            },
        },
    })

    const onMint = () => {
        writeContract({
            ...contractMainInfos,
            functionName: 'safeMintAnimal',
            args: [props.race.id],
        })
    }

    return (
        <div className={'border-4 border-black rounded-2xl p-4 flex flex-col shadow-effect'}>
            <Image
                className="mb-6 rounded-lg"
                src={convertIpfsToHttps(metadata?.image || '')}
                alt={metadata?.name || ''}
                width={64}
                height={64}
            />

            <div className="mb-6 flex-1">
                <h2 className={`text-2xl font-bold mb-2 ${grandstander.className}`}>{metadata?.name}</h2>
                <p className="text-xs">{metadata?.description}</p>
            </div>

            <Button onClick={onMint} isPending={isPending}>
                {isPending ? 'Loading ...' : 'Mint animal'}
            </Button>
        </div>
    )
}
