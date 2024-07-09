'use client'

import React from 'react'
import { formatEther, parseEther } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { useReadAnimalContract, contractMainInfos as animalContractBase } from '@/lib/contracts/useAnimalContract'
import AnimalInfos from './AnimalInfos'
import { contractMainInfos } from '@/lib/contracts/useMarketplaceContract'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Props = {
    bid: {
        animalId: bigint
        price: bigint
        owner: string
    }
}

export default function BidCard(props: Props) {
    const { address } = useAccount()
    const { data: animal } = useReadContract({
        ...animalContractBase,
        functionName: 'getAnimal',
        args: [props.bid.animalId],
    })

    const { writeContract: removeBid } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast('Animal removed from Marketplace')
            },
            onError: (e) => console.error({ e }),
        },
    })

    const { writeContract: buy } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast('Congratulation', {
                    description: 'You have bought this animal',
                })
            },
            onError: (e) => console.error({ e }),
        },
    })

    const onRemove = () => {
        removeBid({
            ...contractMainInfos,
            functionName: 'removeFromSale',
            args: [props.bid.animalId],
        })
    }

    const onBuy = () => {
        console.log(props.bid.price)
        buy({
            ...contractMainInfos,
            functionName: 'buy',
            args: [props.bid.animalId],
            value: props.bid.price,
        })
    }

    const renderAction = () => {
        if (address === props.bid.owner) {
            return <Button onClick={onRemove}>Remove</Button>
        }

        return <Button onClick={onBuy}>Buy</Button>
    }

    return (
        <div className={'border-4 border-black rounded-2xl p-4 flex flex-col shadow-effect'}>
            {!!animal && <AnimalInfos animal={animal} />}
            <ul>
                <li className="inline-flex items-center gap-4 font-mono">
                    <Image src="/images/eth.svg" alt="ETH" width={12} height={12} /> {formatEther(props.bid.price)} ETH
                </li>
            </ul>
            <hr />
            {renderAction()}
        </div>
    )
}
