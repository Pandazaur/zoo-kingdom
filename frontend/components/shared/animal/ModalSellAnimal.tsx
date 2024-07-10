'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useReadContract, useWriteContract } from 'wagmi'
import Image from 'next/image'
import { convertIpfsToHttps } from '@/lib/strings'
import { parseEther } from 'viem'
import { contractMainInfos as mainAnimalContractInfos } from '@/lib/contracts/useAnimalContract'
import { contractMainInfos as marketplaceContractBase } from '@/lib/contracts/useMarketplaceContract'

type Props = {
    tokenId: bigint
    race?: {
        image?: string
    }
    onPutOnSale?: () => unknown
}

export default function ModalSellAnimal(props: Props) {
    const [open, setOpen] = useState(false)

    const { data: approvedAddress, refetch: refetchTokenApproval } = useReadContract({
        ...mainAnimalContractInfos,
        functionName: 'getApproved',
        args: [props.tokenId],
    })

    const { writeContract: approveNft, isPending: isPendingApprove } = useWriteContract({
        mutation: {
            onSuccess: () => {
                refetchTokenApproval()
            },
        },
    })

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess: () => {
                setOpen(false)
                props.onPutOnSale?.()
            },
            onError: (e) => {
                console.error({ e })
            },
        },
    })

    const [amount, setAmount] = useState('')

    const isNftApprovedForMarketplace = approvedAddress === process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS

    const onApprove = () => {
        approveNft({
            ...mainAnimalContractInfos,
            functionName: 'approve',
            args: [process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, props.tokenId],
        })
    }

    const onSell = () => {
        writeContract({
            ...marketplaceContractBase,
            functionName: 'putOnSale',
            args: [props.tokenId, parseEther(amount)],
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full">
                <Button className="w-full">Sell</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Sell animal</DialogTitle>
                    <DialogDescription>
                        <div className="mt-4">
                            <Image
                                src={convertIpfsToHttps(props.race?.image || '')}
                                alt={''}
                                width={64}
                                height={64}
                                className="mb-4 rounded-lg"
                            />
                            <p className="mb-4">The animal will be purchasable on the marketplace.</p>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">
                                        <Image src="/images/eth.svg" width={10} height={10} alt="ETH" />
                                    </span>
                                </div>
                                <input
                                    type="number"
                                    className="flex-1 block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="0.01"
                                    value={amount}
                                    onInput={(e) => setAmount((e.target as HTMLInputElement).value)}
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                        ETH
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="mt-4 w-full"
                                onClick={onApprove}
                                isPending={isPendingApprove}
                                disabled={isNftApprovedForMarketplace}
                            >
                                Approve NFT
                            </Button>
                            <Button
                                className="mt-4 w-full"
                                onClick={onSell}
                                isPending={isPending}
                                disabled={!isNftApprovedForMarketplace || !amount}
                            >
                                Sell
                            </Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
