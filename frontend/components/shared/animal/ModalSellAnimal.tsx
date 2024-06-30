import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useReadContract } from 'wagmi'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { convertIpfsToHttps } from '@/lib/strings'

type Props = {
    race: {
        image?: string
    }
}

export default function ModalSellAnimal(props: Props) {
    const {} = useReadContract({})

    return (
        <Dialog>
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
                                    aria-describedby="price-currency"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                        ETH
                                    </span>
                                </div>
                            </div>
                            <Button className="mt-4 w-full">Sell</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
