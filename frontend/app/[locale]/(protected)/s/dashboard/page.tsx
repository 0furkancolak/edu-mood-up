import React from 'react'
import ParticpationChart from './_components/ParticpationChart';
import AISugg from './_components/AISugg';

export default function page() {
    return (
        <div className='flex flex-col w-full md:flex-row gap-4'>
            <div className='flex-1 overflow-clip'>
                <ParticpationChart />
            </div>
            <div className='flex-1'>
                <AISugg />
            </div>
        </div>
    );
}
