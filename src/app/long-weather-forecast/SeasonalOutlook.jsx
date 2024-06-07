"use client";

import React, { useState } from 'react';
import Wrapper from '../components/shared/Wrapper';

const SeasonalOutlook = () => {
    const [year, setYear] = useState("");
    const [season, setSeason] = useState("");

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSeasonChange = (e) => {
        setSeason(e.target.value);
    };

    const downloadPdf = (docName) => {
        // You can replace the dummy URLs with actual URLs to your Word documents
        const docUrls = {
            'ndj': '/rcc_outlook_NDJ2023.pdf',
        };

        // Get the URL based on the docName
        const docUrl = docUrls[docName];

        // Trigger the download
        if (year && season) {

            const link = document.createElement('a');
            link.href = docUrl;
            link.download = `${docName}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert("select year and season")
        }
    };

    return (
        <Wrapper>
            <div className='flex items-center justify-center flex-col mt-10'>
                <h1 className='text-5xl text-center font-bold'>Seasonal Outlook</h1>
                <a className='text-center tracking-wider font-bold text-[#a33737]'>Morocco</a>
            </div>
            <div>
                <div className="p-2 md:p-8 rounded text-black w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 md:gap-x-4 w-full">
                        <div>
                            <label htmlFor="year" className="block text-black my-3 font-[500]">Year</label>
                            <select
                                required
                                id="year"
                                value={year}
                                onChange={handleYearChange}
                                className="rounded-lg font-[500] border-black border focus:outline-none py-2 px-2 bg-white text-[#181818] w-full"
                            >
                                <option value="">Select Year</option>
                                {[...Array(12)].map((_, i) => {
                                    const yearOption = 2013 + i;
                                    return <option key={yearOption} value={yearOption}>{yearOption}</option>;
                                })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="season" className="block text-black my-3 font-[500]">Season</label>
                            <select
                                required
                                id="season"
                                value={season}
                                onChange={handleSeasonChange}
                                className="rounded-lg font-[500] border-black border focus:outline-none py-2 px-2 bg-white text-[#181818] w-full"
                            >
                                <option value="">Select Season</option>
                                {["DJF", "JFM", "FMA", "MAM", "AMJ", "MJJ", "JJA", "JAS", "ASO", "SON", "OND", "NDJ"].map((seasonOption) => (
                                    <option key={seasonOption} value={seasonOption}>{seasonOption}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={() => downloadPdf('ndj')}
                            className="py-3 mt-10 px-6 
                                    bg-blue-600
                                    text-white hover:bg-blue-500
                                    transition-colors duration-300
                                    rounded-md md:w-[340px] font-[600]"
                        >
                            Show Product
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default SeasonalOutlook;
