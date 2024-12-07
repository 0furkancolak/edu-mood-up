import { MagicCard } from '@/components/ui/magic-card'
import React from 'react'

export default function AISugg() {
    return (
        <MagicCard
            className="cursor-pointer min-h-64 h-full w-full flex-col items-center justify-center shadow-lg whitespace-nowrap text-4xl"
            gradientColor={"#D9D9D955"}
        >
            <h1 className='text-4xl text-center font-bold'> Çok Yakında! </h1>
            <p className='text-sm text-center text-muted-foreground'>
                AI Destekli Öneriler
            </p>
        </MagicCard>
    )
}
