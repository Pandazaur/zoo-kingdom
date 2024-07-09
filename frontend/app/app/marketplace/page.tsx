'use client'

import React, { useState } from 'react'
import { useReadContract, useWatchContractEvent } from 'wagmi'
import { formatEther } from 'viem'
import { DateTime } from 'luxon'
import { contractMainInfos } from '@/lib/contracts/useMarketplaceContract'
import BidCard from '@/components/shared/animal/BidCard'
import { MarketplaceChangeEvent, formatMarketplaceAction } from '@/types/Marketplace.type'
import { marketplaceAbi } from '@/contracts'

type Props = {}

export default function MarketplacePage(props: Props) {
    const { data: bids, isLoading } = useReadContract({
        ...contractMainInfos,
        functionName: 'getBids',
    })

    useWatchContractEvent({
        ...contractMainInfos,
        eventName: 'MarketplaceChange',
        onLogs: (logs) => {
            setEvents(logs.map((log) => log.args as MarketplaceChangeEvent))
        },
        fromBlock: 1n,
    })

    const [events, setEvents] = useState<MarketplaceChangeEvent[]>([])

    const formatDate = (dateBigInt: bigint) => {
        return DateTime.fromMillis(Number(dateBigInt * 1000n)).toLocaleString(DateTime.DATETIME_SHORT)
    }

    return (
        <div>
            <h1 className="text-3xl font-medium mb-6">Marketplace</h1>
            {isLoading ? (
                'Loading ...'
            ) : (
                <div className="flex flex-wrap gap-6">
                    <div className="w-full md:w-8/12">
                        <h2 className={'text-xl font-medium mb-4'}>Les animaux en vente</h2>
                        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                            {bids?.map((bid, i) => <BidCard bid={bid} key={i} />)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className={'text-xl font-medium mb-4'}>Les derniers événements</h2>
                        <div>
                            {events.toReversed().map((event) => (
                                <div className="p-2 text-sm border border-black rounded-lg mb-2" key={event.date}>
                                    <div className="inline-flex items-center gap-4">
                                        <div className="inline-block bg-amber-500 text-white p-1 rounded">
                                            {formatMarketplaceAction(event.action)}
                                        </div>
                                        <div>{formatDate(event.date)}</div>
                                    </div>
                                    <div>Price: {formatEther(event.bid.price)} ETH</div>

                                    <div>
                                        {event.sender.slice(0, 5)}...{event.sender.slice(-5)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
