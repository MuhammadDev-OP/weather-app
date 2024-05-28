import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer class="bg-white rounded-lg shadow mt-52 mb-4 ">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src={"/logo.jpg"} width={1920} height={1080} className='w-[60px] h-[60px]' alt='logo' />                        <span class="self-center text-2xl font-semibold whitespace-nowrap">Maroc Metro</span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
                        <li>
                            <a href='/long-weather-forecast' class="hover:underline me-4 md:me-6">Long Weather Forecast</a>
                        </li>
                        <li>
                            <a href="/data-services" class="hover:underline me-4 md:me-6">Data Services</a>
                        </li>
                        <li>
                            <a href="/" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center ">© 2023 <a href="https://flowbite.com/" class="hover:underline">Maroc Metro</a>. All Rights Reserved.</span>
            </div>
        </footer>


    )
}

export default Footer