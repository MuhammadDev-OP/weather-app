import React from 'react'
import Hero4 from '../components/widgets/Hero4'
import Image from 'next/image'
import Wrapper from '../components/shared/Wrapper'

const Page = () => {
    return (
        <>
            <Hero4 />
            <Wrapper>


                <div className='flex items-center justify-center flex-col mt-10'>
                    <h1 className='text-5xl font-bold'>Other Locations</h1>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 mb-10 justify-items-center'>
                    <div className='mt-5 p-4 shadow-lg rounded-lg'>
                        <Image src={"/morocco.png"} width={120} height={120} alt="Morocco" />
                        <a href="/climate-monitoring/morocco" className='font-bold text-lg text-center mt-5 block'>Morocco</a>
                    </div>
                    <div className='mt-5 p-4 shadow-lg rounded-lg'>
                        <Image src={"/algeria.png"} width={120} height={120} alt="Algeria" />
                        <a href="/climate-monitoring/algeria" className='font-bold text-lg text-center mt-5 block'>Algeria</a>
                    </div>
                    <div className='mt-5 p-4 shadow-lg rounded-lg'>
                        <Image src={"/libya.png"} width={120} height={120} alt="Libya" />
                        <a href="/climate-monitoring/libya" className='font-bold text-lg text-center mt-5 block'>Libya</a>
                    </div>
                    <div className='mt-5 p-4 shadow-lg rounded-lg'>
                        <Image src={"/egypt.png"} width={120} height={120} alt="Egypt" />
                        <a href="/climate-monitoring/egypt" className='font-bold text-lg text-center mt-5 block'>Egypt</a>
                    </div>
                    <div className='mt-5 p-4 shadow-lg rounded-lg'>
                        <Image src={"/tunisia.png"} width={120} height={120} alt="Egypt" />
                        <a href="/climate-monitoring/tunisia" className='font-bold text-lg text-center mt-5 block'>Tunisia</a>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

export default Page