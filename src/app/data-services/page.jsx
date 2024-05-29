"use client"

import React from 'react'
import LineChart from './components/LineChart'
import Wrapper from '../components/shared/Wrapper'
import Hero3 from '../components/widgets/Hero3'
import { useState } from 'react'

const Page = () => {
    const [chartData, setChartData] = useState({
        series: [],
        chartOptions: {
            colors: ['#79e200'], // Setting line color to green
            theme: {
                mode: "dark",
            },
            stroke: {
                curve: "smooth",
                width: 3, // Adjust line thickness
            },
            markers: {
                size: 6, // Adjust marker size
            },
            chart: {
                type: "line",
                height: 750,
                toolbar: {
                    show: true,
                    tools: {
                        download: false, // Disable download tool
                        selection: true, // Enable selection tool for zooming
                        zoom: true, // Enable zooming tool
                        zoomin: true,
                        zoomout: true,
                        pan: true, // Enable panning tool
                        reset: true, // Enable reset tool to reset zoom level
                    },
                },
                zoom: {
                    enabled: true,
                },
                background: "black",
            },
            legend: {
                show: false,
            },
            yaxis: {
                title: {
                    text: "Temperature",
                },
            },
            xaxis: {
                type: "datetime",
                labels: {
                    formatter: function (value) {
                        return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    },
                },
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: (val) => `${val.toFixed(2)}`,
                },
            },
        }
    })

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

                    <LineChart chartData={chartData} updateChartData={updateChartData} />
                </div>
            </Wrapper>
        </>
    )
}

export default Page