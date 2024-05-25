"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const [climateDropdownOpen, setClimateDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleProductsDropdown = () => {
        setProductsDropdownOpen(!productsDropdownOpen);
    };

    const toggleClimateDropdown = () => {
        setClimateDropdownOpen(!climateDropdownOpen);
    };

    return (
        <nav className="bg-white/80 w-full border-gray-200 fixed z-50">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <button
                    data-collapse-toggle="navbar-dropdown"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    aria-controls="navbar-dropdown"
                    aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                    onClick={toggleMobileMenu}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-dropdown">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                        <li>
                            <a href="/" className="block py-2 px-3 text-xl text-gray-900 rounded md:p-0" aria-current="page">Home</a>
                        </li>
                        <li className="relative">
                            <button
                                id="productsDropdownLink"
                                onClick={toggleProductsDropdown}
                                className="flex items-center text-xl justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:w-auto"
                            >
                                Products
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div id="productsDropdown" className={`absolute z-10 ${productsDropdownOpen ? 'block' : 'hidden'} font-normal bg-white/75 divide-y divide-gray-100 rounded-lg shadow w-56`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a href="/long-weather-forecast" className="block px-4 py-2 hover:bg-gray-100">Long Weather Forecast</a>
                                    </li>
                                    <li>
                                        <a href="/data-services" className="block px-4 py-2 hover:bg-gray-100">Data Services</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="relative">
                            <button
                                id="climateDropdownLink"
                                onClick={toggleClimateDropdown}
                                className="flex items-center text-xl justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 md:w-auto"
                            >
                                Climate Monitoring
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            <div id="climateDropdown" className={`absolute z-10 ${climateDropdownOpen ? 'block' : 'hidden'} font-normal bg-white/75 divide-y divide-gray-100 rounded-lg shadow w-56`}>
                                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <a href="/climate-monitoring/morocco" className="block px-4 py-2 hover:bg-gray-100">Morocco</a>
                                    </li>
                                    <li>
                                        <a href="/climate-monitoring/algeria" className="block px-4 py-2 hover:bg-gray-100">Algeria</a>
                                    </li>
                                    <li>
                                        <a href="/climate-monitoring/libya" className="block px-4 py-2 hover:bg-gray-100">Libya</a>
                                    </li>
                                    <li>
                                        <a href="/climate-monitoring/egypt" className="block px-4 py-2 hover:bg-gray-100">Egypt</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">
                        <Image src={"/logo.jpg"} width={1920} height={1080} className='w-[60px] h-[60px]' alt='logo' />
                    </span>
                </a>
            </div>
        </nav>
    );
};

export default Header;
