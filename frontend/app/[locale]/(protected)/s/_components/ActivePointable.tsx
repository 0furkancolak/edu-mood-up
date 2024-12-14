import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa"
import { ArrowRight } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
export default function ActivePointable() {
    return (
        <div className='md:fixed bottom-4 right-4 z-50'>
            <MagicCard gradientColor={"#D9D9D955"} className="md:w-72 w-full md:h-48 h-40 md:mx-auto backdrop-blur-sm bg-white/80 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <CardContent className="p-3 md:p-8">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                            <FaRegSmile className="size-8 text-gray-700" />
                            <h3 className="text-xl text-nowrap font-semibold text-center text-gray-800">
                                Nasıl Gidiyor?
                            </h3>
                        </div>
                        <p className="text-gray-600 text-center text-xs">
                            Şu anki dersinizle ilgili duygu durumunuzu belirtmek için tıklayın
                        </p>
                        <Link href="/duygu-durumu" className="w-full">
                            <Button className="w-full transform hover:scale-[1.01] transition-all duration-300">
                                Hadi Mood&apos;u Belirt
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </MagicCard>
        </div>
    )
}
