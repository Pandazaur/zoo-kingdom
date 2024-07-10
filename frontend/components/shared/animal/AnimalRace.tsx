'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import useMetadata from '@/lib/hooks/useMetadata'
import { convertIpfsToHttps } from '@/lib/strings'
import { RaceMetadata } from '@/types/Race.type'
import { grandstander } from '@/lib/fonts'
import { useZooPass } from '@/lib/contracts/useZooPass'

import { contractMainInfos } from '@/lib/contracts/useAnimalContract'

type Props = {
    race: {
        id: string
        maxChildrenCount: BigInt
        metadataUri: string
        isPremium: boolean
    }
}

export default function AnimalRace(props: Props) {
    const account = useAccount()
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

    const { isPremium } = useZooPass()

    const buttonState = useMemo<{ text: string; disabled?: boolean; isPending?: boolean }>(() => {
        if (!account.isConnected) {
            return { text: `Connect your wallet`, disabled: true }
        }

        if (isPending) {
            return { text: 'Loading ...', isPending: true }
        }

        if (props.race.isPremium && !isPremium) {
            return { text: 'You need a premium account', disabled: true }
        }

        return { text: 'Mint animal' }
    }, [account.isConnected, isPending, isPremium, props.race])

    const onMint = () => {
        writeContract({
            ...contractMainInfos,
            functionName: 'safeMintAnimal',
            args: [props.race.id],
        })
    }

    return (
        <div
            className={`border-4 border-black rounded-2xl p-4 flex flex-col shadow-effect ${buttonState.disabled ? `opacity-50` : ''}`}
        >
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

            <Button onClick={onMint} isPending={buttonState.isPending} disabled={buttonState.disabled}>
                {buttonState.text}
            </Button>
        </div>
    )
}
