import dynamic from 'next/dynamic'


import React from 'react'
import Wrapper from '../components/shared/Wrapper'
import Hero3 from '../components/widgets/Hero3'
const LineChart = dynamic(() => import('./components/LineChart'), { ssr: false });


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
                    <h1 className='text-5xl text-center font-bold'>Data Services</h1>
                    <a className='text-center tracking-wider font-bold text-[#a33737]'>Morocco</a>
                </div>
                <div className='mt-10'>

                    <LineChart />
                </div>
            </Wrapper>
        </>
    )
}

export default Page