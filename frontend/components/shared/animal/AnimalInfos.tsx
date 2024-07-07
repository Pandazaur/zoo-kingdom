'use client'

import { Gender, formatGender } from '@/lib/animal'
import { grandstander } from '@/lib/fonts'
import useMetadata from '@/lib/hooks/useMetadata'
import { convertIpfsToHttps } from '@/lib/strings'
import { RaceMetadata } from '@/types/Race.type'
import Image from 'next/image'
import React from 'react'

type Props = {
    animal: {
        tokenId: bigint
        childCount: bigint
        gender: Gender
        race: {
            maxChildrenCount: bigint
            metadataUri: string
        }
    }
}

export default function AnimalInfos(props: Props) {
    const { data: raceMetadata } = useMetadata<RaceMetadata>(props.animal.race.metadataUri)

    return (
        <div>
            <Image
                className="mb-6 rounded-lg"
                src={convertIpfsToHttps(raceMetadata?.image || '')}
                alt={raceMetadata?.name || ''}
                width={64}
                height={64}
            />

            <div className="mb-6 flex-1">
                <div className="inline-flex items-center mb-2 gap-2">
                    <h2 className={`text-2xl font-bold ${grandstander.className}`}>
                        {raceMetadata?.name}
                    </h2>
                    <div className='text-xs p-1 bg-emerald-100 rounded'># {props.animal.tokenId.toString()}</div>
                </div>
                <ul className="text-sm">
                    <li>
                        Child count: {props.animal.childCount.toLocaleString()} /{' '}
                        {props.animal.race.maxChildrenCount.toLocaleString()}
                    </li>
                    <li>Gender: {formatGender(props.animal.gender)}</li>
                </ul>
            </div>
        </div>
    )
}
