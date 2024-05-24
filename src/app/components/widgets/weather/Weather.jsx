"use client";

import React, { useRef, useEffect } from 'react';
import { Map, config, MapStyle } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer } from '@maptiler/weather';
import Wrapper from '../../shared/Wrapper';

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
        });


        map.on('load', async () => {
            // Create a new RadarLayer instance
            const radarLayerInstance = new RadarLayer({
                apiKey: config.apiKey, // Use the configured API key
            });
            radarLayerRef.current = radarLayerInstance;

            // Add the radar layer to the map
            map.addLayer(radarLayerInstance);

            // Wait for the source to be ready
            await radarLayerInstance.onSourceReadyAsync();

            // Set a constant animation speed (adjust as needed)
            const animationSpeed = 1000; // Increase the value to speed up the animation

            // Start the radar animation with the specified speed
            radarLayerInstance.animate(animationSpeed);
        });

        return () => {
            if (map) map.remove();
        };
    }, []);


    return (
        <Wrapper>
            <div className='my-20 rounded-lg overflow-hidden'>
                <div
                    ref={mapContainerRef}
                    style={{ width: '100%', height: '600px', borderRadius: '15px' }}
                />
            </div>
        </Wrapper>
    );
};

export default Weather;