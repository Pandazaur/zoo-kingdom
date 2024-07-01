'use client'

import React from 'react'
import { useReadContract } from 'wagmi'
import { contractMainInfos } from '@/lib/contracts/useMarketplaceContract'
import BidCard from '@/components/shared/animal/BidCard'

type Props = {}

export default function MarketplacePage(props: Props) {
    const { data: bids, isLoading } = useReadContract({
        ...contractMainInfos,
        functionName: 'getBids',
    })

    return (
        <div>
            <h1 className="text-3xl font-medium mb-6">Marketplace</h1>
            {isLoading ? (
                'Loading ...'
            ) : (
                <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                    {bids?.map((bid, i) => <BidCard bid={bid} key={i} />)}
                </div>
            )}
        </div>
    )
}
