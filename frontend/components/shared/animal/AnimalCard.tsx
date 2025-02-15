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
import AnimalInfos from './AnimalInfos'
import ModalBreed from './ModalBreed'

type Props = {
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

export default function AnimalCard(props: Props) {
    const { data: raceMetadata } = useMetadata<RaceMetadata>(props.animal.race.metadataUri)

    return (
        <div className={'border-4 border-black rounded-2xl p-4 flex flex-col shadow-effect'}>
            {!!props.animal && <AnimalInfos animal={props.animal} />}
            <div className="flex items-center gap-4">
                <div className="flex-1">
                    <ModalSellAnimal tokenId={props.animal.tokenId} race={raceMetadata} />
                </div>
                <div className="flex-1">
                    <ModalBreed
                        tokenId={props.animal.tokenId}
                        animal={props.animal}
                        raceMetadata={raceMetadata}
                        onBreeded={props.onBreeded}
                    />
                </div>
            </div>
        </div>
    )
}
