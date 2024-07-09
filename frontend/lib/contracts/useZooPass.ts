import { useMemo } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { zooPassAbi } from '@/contracts'

export const contractMainInfos = {
    abi: zooPassAbi,
    address: process.env.NEXT_PUBLIC_ZOOPASS_ADDRESS,
}

export function useZooPass() {
    const account = useAccount()

    const { data: balance, refetch } = useReadContract({
        ...contractMainInfos,
        functionName: 'balanceOf',
        args: [account.address!],
        query: {
            enabled: !!account.address,
        },
    })

    const isPremium = useMemo(() => {
        return !!balance
    }, [balance])

    return { isPremium, refetch }
}
