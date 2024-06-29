import Header from '@/components/shared/header/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function page(props: Props) {
    return (
        <div>
            <Header />
            <main className="font-dm-sans py-10 container mx-auto">{props.children}</main>
        </div>
    )
}
