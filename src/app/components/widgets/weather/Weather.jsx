"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Map, config, MapStyle } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { ColorRamp, RadarLayer, TemperatureLayer, WindLayer } from '@maptiler/weather';
import Wrapper from '../../shared/Wrapper';
import Image from 'next/image';

const Weather = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);
    const temperatureLayerRef = useRef(null);
    const windLayerRef = useRef(null);
    const pointerDataDivRef = useRef(null);

    const [showRadar, setShowRadar] = useState(true);
    const [showTemperature, setShowTemperature] = useState(true);

    useEffect(() => {
        // Set your MapTiler API key
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        // Create a new Map instance with a lighter style for better visibility
        const map = new Map({
            container: mapContainerRef.current,
            style: MapStyle.OPENSTREETMAP, // Use a different style for better visibility
            center: [10.0, 29.0], // Centering on North Africa
            zoom: 4,
            scrollZoom: false,
            hash: true,
        });

        const updatePointerValue = (lngLat) => {
            if (!lngLat) return;
            const valueWind = windLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            const valueTemp = temperatureLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            if (!valueWind || !valueTemp) {
                pointerDataDivRef.current.innerText = "";
                return;
            }
            pointerDataDivRef.current.innerText = `${valueTemp.value.toFixed(1)}°C \n ${valueWind.speedKilometersPerHour.toFixed(1)} km/h`;
        };

        map.on('load', async () => {
            const radarLayerInstance = new RadarLayer({
                apiKey: config.apiKey,
                opacity: 0.7, // Set opacity for the radar layer
            });
            radarLayerRef.current = radarLayerInstance;

            const temperatureLayerInstance = new TemperatureLayer({
                apiKey: config.apiKey,
                opacity: 0.7, // Set opacity for the temperature layer
            });
            temperatureLayerRef.current = temperatureLayerInstance;

            const windLayer = new WindLayer({
                id: "Wind Particles",
                colorramp: ColorRamp.builtin.NULL,
                speed: 0.001,
                fadeFactor: 0.03,
                maxAmount: 256,
                density: 200,
                color: [0, 0, 0, 30],
                fastColor: [0, 0, 0, 100],
                opacity: 0.8,
            });
            windLayerRef.current = windLayer;

            map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.6)");
            map.addLayer(radarLayerInstance);
            map.addLayer(windLayer);
            map.addLayer(temperatureLayerInstance, "Water");

            await radarLayerInstance.onSourceReadyAsync();
            await temperatureLayerInstance.onSourceReadyAsync();

            const animationSpeed = 1000;

            radarLayerInstance.animate(animationSpeed);
            temperatureLayerInstance.animate();

            map.on('mousemove', (e) => {
                updatePointerValue(e.lngLat);
            });
        });

        return () => {
            if (map) map.remove();
        };
    }, []);

    const toggleRadarLayer = () => {
        if (radarLayerRef.current) {
            setShowRadar(!showRadar);
            radarLayerRef.current.setOpacity(showRadar ? 0 : 0.5);
        }
    };

    const toggleTemperatureLayer = () => {
        if (temperatureLayerRef.current) {
            setShowTemperature(!showTemperature);
            temperatureLayerRef.current.setOpacity(showTemperature ? 0 : 0.5);
        }
    };

    return (
        <Wrapper>
            <div className='flex items-center justify-center flex-col mt-10'>
                <h1 className='text-5xl font-bold'>Climate Monitoring</h1>
                <a className='text-center tracking-wider font-bold text-[#6D5DDD]'>North Africa</a>
            </div>
            <div className='my-10 rounded-lg overflow-hidden relative'>
                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '600px', borderRadius: '15px' }}
                />
                <div
                    ref={pointerDataDivRef}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        padding: '10px',
                        borderRadius: '5px',
                        zIndex: 1,
                    }}
                />
            </div>
            <div className='flex justify-center gap-4 mb-10'>
                <button onClick={toggleRadarLayer} className='px-4 py-2 bg-blue-500 text-white rounded'>
                    Toggle Radar Layer
                </button>

            </div>
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
            </div>
        </Wrapper>
    );
};

export default Weather;