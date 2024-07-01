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

import { Gender, formatGender } from '@/lib/animal'
import ModalSellAnimal from './ModalSellAnimal'

type Props = {
    animal: {
        tokenId: BigInt
        race: {
            id: string
            maxChildrenCount: BigInt
            metadataUri: string
        }
        childCount: BigInt
        gender: Gender
    }
}

export default function AnimalCard(props: Props) {
    const { data: raceMetadata } = useMetadata<RaceMetadata>(props.animal.race.metadataUri)

    return (
        <div className={'border-4 border-black rounded-2xl p-4 flex flex-col shadow-effect'}>
            <Image
                className="mb-6 rounded-lg"
                src={convertIpfsToHttps(raceMetadata?.image || '')}
                alt={raceMetadata?.name || ''}
                width={64}
                height={64}
            />

            <div className="mb-6 flex-1">
                <h2 className={`text-2xl font-bold mb-2 ${grandstander.className}`}>{raceMetadata?.name}</h2>
                <ul className="text-sm">
                    <li>
                        Child count: {props.animal.childCount.toLocaleString()} /{' '}
                        {props.animal.race.maxChildrenCount.toLocaleString()}
                    </li>
                    <li>Gender: {formatGender(props.animal.gender)}</li>
                </ul>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <ModalSellAnimal tokenId={props.animal.tokenId} race={raceMetadata} />
                </div>
                <Button className="flex-1" disabled>
                    Transfer
                </Button>
            </div>
        </div>
    )
}
