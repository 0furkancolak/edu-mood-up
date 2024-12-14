import React from 'react'
import NavCard from './NavCard'
import { Boxes, LandPlot, NotebookPen, Users } from 'lucide-react'

export default function NavCards() {
    const data = [
        {
            title: "Bu Ayki Katılım",
            Icon: NotebookPen,
            count: "12",
            percentage: 5
        },
        {
            title: "Toplam Ders",
            Icon: Boxes,
            count: "5",
            percentage: 5
        },
        {
            title: "Bu Ayki Katılım Oranı",
            Icon: LandPlot,
            count: "%40",
            percentage: 5
        },
        {
            title: "Toplam Katılım",
            Icon: Users,
            count: "10",
            percentage: 5
        },
    ]
    return (
        <div className='w-[calc(100vw-3rem)] md:w-[calc(100vw-30rem)] scrollbar-none overflow-x-scroll lg:w-full lg:overflow-hidden' >
            <div className="flex gap-4 w-max lg:w-full">
                {data?.map((item, index) => (
                    <NavCard className='flex-1 min-w-48' key={index} {...item} />
                ))}
            </div>
        </div>
    )
}
