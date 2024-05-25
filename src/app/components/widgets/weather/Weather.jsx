"use client";

import React, { useRef, useEffect } from 'react';
import { Map, config, MapStyle } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer } from '@maptiler/weather';
import Wrapper from '../../shared/Wrapper';
import Image from 'next/image';

const Weather = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);

    useEffect(() => {
        // Set your MapTiler API key
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        // Create a new Map instance with a lighter style for better visibility
        const map = new Map({
            container: mapContainerRef.current,
            style: MapStyle.BRIGHT.DARK, // Use a different style for better visibility
            center: [10.0, 29.0], // Centering on North Africa
            zoom: 4,
            scrollZoom: false,

        });


        map.on('load', async () => {
            const radarLayerInstance = new RadarLayer({
                apiKey: config.apiKey,
            });
            radarLayerRef.current = radarLayerInstance;

            // Add the radar layer to the map
            map.addLayer(radarLayerInstance);
            await radarLayerInstance.onSourceReadyAsync();

            const animationSpeed = 1000;

            radarLayerInstance.animate(animationSpeed);
        });

        return () => {
            if (map) map.remove();
        };
    }, []);


    return (
        <Wrapper>
            <div className='flex items-center justify-center flex-col mt-10'>
                <h1 className='text-5xl font-bold '>Climate Monitoring </h1>
                <a className='text-center tracking-wider font-bold text-[#6D5DDD]'>North Africa</a>
            </div>
            <div className='my-10 rounded-lg overflow-hidden'>
                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '600px', borderRadius: '15px' }}
                />
            </div>
            <div className='flex items-center justify-center flex-col mt-10'>
                <h1 className='text-5xl font-bold '>Other Locations </h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-5 mb-10 justify-items-center'>
                <div className='mt-5 p-4 shadow-lg rounded-lg'>
                    <Image src={"/morocco.png"} width={120} height={120} />
                    <a href="/climate-monitoring/morocco" className='font-bold text-lg text-center mt-5 block'>Morocco</a>
                </div>

                <div className='mt-5 p-4 shadow-lg rounded-lg'>
                    <Image src={"/algeria.png"} width={120} height={120} />
                    <a href="/climate-monitoring/algeria" className='font-bold text-lg text-center mt-5 block'>Algeria</a>
                </div>
                <div className='mt-5 p-4 shadow-lg rounded-lg'>
                    <Image src={"/libya.png"} width={120} height={120} />
                    <a href="/climate-monitoring/libya" className='font-bold text-lg text-center mt-5 block'>Libya</a>

                </div>
                <div className='mt-5 p-4 shadow-lg rounded-lg'>
                    <Image src={"/egypt.png"} width={120} height={120} />
                    <a href="/climate-monitoring/egypt" className='font-bold text-lg text-center mt-5 block'>Egypt</a>
                </div>
            </div>

        </Wrapper>
    );
};

export default Weather;
