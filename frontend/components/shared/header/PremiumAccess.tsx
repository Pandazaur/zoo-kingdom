import React from 'react'
import { useZooPass, contractMainInfos } from '@/lib/contracts/useZooPass'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'

type Props = {}

export default function PremiumAccess(props: Props) {
    const { isPremium, refetch: refetchZooPass } = useZooPass()
    const account = useAccount()

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                refetchZooPass()
            },
            onError: console.error
        }
    })

    const { data: zooPassPrice } = useReadContract({
        ...contractMainInfos,
        functionName: "zooPassPrice",
    })

    const onGoPremium = () => {

        if (isPending || isPremium) {
            return null
        }

        writeContract({
            ...contractMainInfos,
            functionName: 'buyZooPass',
            args: [account.address],
            value: zooPassPrice
        })
    }

    return (
        <button className="p-4 rounded-lg border border-black text-left" onClick={onGoPremium}>
            <h4 className={isPremium ? 'font-medium text-amber-500' : 'font-medium'}>{isPremium ? 'Premium' : 'Basic'}</h4>
            <p className="text-xs">{isPremium ? 'Vous avez accès aux fonctionnalités premium' : 'Passer premium'}</p>
            
        </button>
    )
}