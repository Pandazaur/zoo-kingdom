'use client'

import React, { useState } from 'react'
import { useReadContract, useWatchContractEvent } from 'wagmi'
import { contractMainInfos } from '@/lib/contracts/useMarketplaceContract'
import BidCard from '@/components/shared/animal/BidCard'
import { MarketplaceChangeEvent, formatMarketplaceAction } from '@/types/Marketplace.type'
import { formatEther } from 'viem'
import { DateTime } from 'luxon'

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
            setEvents(logs.map((log: any) => log.args as MarketplaceChangeEvent))
        },
        fromBlock: 1n,
    })

    const [events, setEvents] = useState<MarketplaceChangeEvent[]>([])

    const formatDate = (dateBigInt: bigint) => {
        // console.log((dateBigInt * 1000n).toString())
        return DateTime.fromMillis(Number(dateBigInt * 1000n)).toLocaleString(DateTime.DATETIME_SHORT)
        // return new Date(Number((dateBigInt * 1000n).toString())).toString()
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
                            <table>
                                <thead>
                                    <tr>
                                        <td>Action</td>
                                        <td>Info</td>
                                        <td>Date</td>
                                        <td>From</td>
                                    </tr>
                                </thead>
                            </table>
                            <tbody>
                                <tr></tr>
                            </tbody>
                            {events.map((event) => (
                                <tr key={event.date}>
                                    <td>{formatMarketplaceAction(event.action)}</td>
                                    <td>Price: {formatEther(event.bid.price)} ETH</td>
                                    <td>{formatDate(event.date)}</td>
                                    <td>
                                        {event.sender.slice(0, 5)}...{event.sender.slice(-5)}
                                    </td>
                                </tr>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
