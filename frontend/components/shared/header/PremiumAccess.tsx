import React, { useMemo } from 'react'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'
import { useZooPass, contractMainInfos } from '@/lib/contracts/useZooPass'
import { formatEther } from 'viem'
import { BoltIcon } from '@heroicons/react/24/outline'

type Props = {}

export default function PremiumAccess(props: Props) {
    const { isPremium, refetch: refetchZooPass } = useZooPass()
    const account = useAccount()

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                refetchZooPass()
            },
            onError: console.error,
        },
    })

    const { data: zooPassPrice } = useReadContract({
        ...contractMainInfos,
        functionName: 'zooPassPrice',
    })

    const premiumWording = useMemo(() => {
        if (isPremium) {
            return 'You have access to the premium features'
        }

        if (zooPassPrice) {
            return `Unlock premium for ${formatEther(zooPassPrice)} ETH`
        }

        return ''
    }, [isPremium, zooPassPrice])

    const onGoPremium = () => {
        if (isPending || isPremium || !account.address) {
            return null
        }

        writeContract({
            ...contractMainInfos,
            functionName: 'buyZooPass',
            args: [account.address],
            value: zooPassPrice,
        })
    }

    return (
        <button
            className="py-2 px-6 rounded-xl border border-black border-2 text-left bg-amber-100 inline-flex items-center gap-4"
            onClick={onGoPremium}
        >
            <BoltIcon width={32} />
            <div>
                <h4 className={isPremium ? 'font-medium text-amber-500' : 'font-medium'}>
                    {isPremium ? 'Premium' : 'Become premium'}
                </h4>
                <p className="text-xs">{premiumWording}</p>
            </div>
        </button>
    )
}
