import dynamic from 'next/dynamic'


import React from 'react'
import Wrapper from '../components/shared/Wrapper'
import Hero3 from '../components/widgets/Hero3'
const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });
const LineChart2 = dynamic(() => import('./components/LineChart2'), { ssr: false });



const Page = () => {

    const updateChartData = (seriesData) => {
        setChartData(prevState => ({
            ...prevState,
            series: [{ name: "Temperature", data: seriesData }]
        }));
    };

    return (
        <>
            <Hero3 />
            <Wrapper>
                <div className='flex items-center justify-center flex-col mt-10'>
                    <h1 className='text-lg text-center font-bold md:text-5xl'>Data Services</h1>
                    <a className='text-center tracking-wider font-bold text-[#a33737]'>Morocco</a>
                </div>
                <div className='flex flex-col mt-10'>
                    <h1 className='text-lg md:text-2xl font-bold text-amber-600'>Temperature</h1>
                </div>
                <div className='mt-10'>
                    <LineChart />
                </div>
                <div className='flex flex-col mt-10'>
                    <h1 className='text-lg md:text-2xl font-bold text-blue-600'>Precipitation</h1>
                </div>
                <div className='mt-10'>
                    <LineChart2 />
                </div>
            </Wrapper>
        </>
    )
}

export default Page