import React from 'react'
import NavCards from '../_components/nav-card'
import ActivePointable from './_components/ActivePointable'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col gap-4 overflow-clip'>
            <NavCards />
            <ActivePointable />
            {children}
        </div>
    )
}
