import Header from '@/components/shared/header/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

export default function page(props: Props) {
    return (
        <div>
            <Header />
            <div className="font-dm-sans p-10">
                My first page
                <br />
                <br />
                <Button size="sm">Connect my wallet</Button>
                <Button>Connect my wallet</Button>
                <Button size={'lg'}>Connect my wallet</Button>
            </div>
        </div>
    )
}
