import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa"
import { ArrowRight } from 'lucide-react'
import { MagicCard } from '@/components/ui/magic-card'
export default function ActivePointable() {
    return (
        <MagicCard gradientColor={"#D9D9D955"} className="md:w-80 w-full  md:h-72 mx-auto backdrop-blur-sm md:fixed bottom-4 right-4 z-50 bg-white/80 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <CardContent className="p-3 md:p-8">
                <div className="flex flex-col items-center gap-3">
                    <FaRegSmile className="w-16 h-16 text-gray-700 animate-pulse" />
                    <h3 className="text-2xl font-semibold text-center text-gray-800">
                        Nasıl Gidiyor?
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                        Şu anki dersinizle ilgili duygu durumunuzu belirtmek için tıklayın
                    </p>
                    <Link href="/duygu-durumu" className="w-full">
                        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-6 rounded-lg transform hover:scale-[1.02] transition-all duration-300">
                            Hadi Mood&apos;u Belirt
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </MagicCard>
    )
}
