"use client"

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

    const handleSubmit = async () => {
        const params = new URLSearchParams();
        params.append('year', year);
        params.append('saison', season);

        try {
            const response = await fetch('http://rccna.net/moroccosoresult.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };

    // const handleDownload = () => {
    //     const link = document.createElement('a');
    //     link.href = 'lrf/rcc_outlook_ASO2023.pdf';
    //     link.download = 'rcc_outlook_ASO2023.pdf';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

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
                                id="year"
                                value={year}
                                onChange={handleYearChange}
                                className="rounded-lg font-[500] border-black border focus:outline-none py-2 px-2 bg-white text-[#181818] w-full"
                            >
                                <option value="">Select Year</option>
                                <option value="2013">2013</option>
                                <option value="2014">2014</option>
                                <option value="2015">2015</option>
                                <option value="2016">2016</option>
                                <option value="2017">2017</option>
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="season" className="block text-black my-3 font-[500]">Season</label>
                            <select
                                id="season"
                                value={season}
                                onChange={handleSeasonChange}
                                className="rounded-lg font-[500] border-black border focus:outline-none py-2 px-2 bg-white text-[#181818] w-full"
                            >
                                <option value="">Select Season</option>
                                <option value="DJF">DJF</option>
                                <option value="JFM">JFM</option>
                                <option value="FMA">FMA</option>
                                <option value="MAM">MAM</option>
                                <option value="AMJ">AMJ</option>
                                <option value="MJJ">MJJ</option>
                                <option value="JJA">JJA</option>
                                <option value="JAS">JAS</option>
                                <option value="ASO">ASO</option>
                                <option value="SON">SON</option>
                                <option value="OND">OND</option>
                                <option value="NDJ">NDJ</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            onClick={handleSubmit}
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
