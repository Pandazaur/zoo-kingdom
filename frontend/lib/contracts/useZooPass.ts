import { abi } from '@/artifacts/contracts/ZooPass.sol/ZooPass.json'
import { useMemo } from 'react'
import { useAccount, useReadContract } from 'wagmi'

export const contractMainInfos = {
    abi,
    address: process.env.NEXT_PUBLIC_ZOOPASS_ADDRESS,
}

export function useZooPass() {
    const account = useAccount()

    const { data: balance, refetch } = useReadContract({
        ...contractMainInfos,
        functionName: 'balanceOf',
        args: [account.address],
    })

    const isPremium = useMemo(() => {
        return !!balance
    }, [balance])

    return { isPremium, refetch }
}