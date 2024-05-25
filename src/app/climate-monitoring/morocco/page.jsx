"use client"

import React, { useRef, useEffect } from 'react';
import { Map, config, MapStyle } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer } from '@maptiler/weather';
import { Marker } from '@maptiler/sdk';

<style jsx>{`
    .map-container {
        width: 100%;
        height: 100vh;
        border-radius: 20px; /* Adjust the radius as needed */
        overflow: hidden; /* Ensure content inside the container doesn't overflow */
    }
`}</style>

const page = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);

    useEffect(() => {
        // Set your MapTiler API key
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        // Create a new Map instance with a lighter style for better visibility
        const map = new Map({
            container: mapContainerRef.current,
            style: MapStyle.BRIGHT.DARK, // Use a different style for better visibility
            center: [-8.0926, 31.7917], // Centering on Morocco
            zoom: 4.5, // Adjusted zoom level to focus on Morocco
            dragPan: false,
            scrollZoom: false,
            geolocateControl: false,
            maptilerLogo: false,
            scaleControl: false,
            fullscreenControl: false

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

            // Add a draggable marker on top of Morocco
            const marker = new Marker({
                color: "#dc2626", // White color for the marker
                draggable: true,
            }).setLngLat([-7.0926, 31.7917]) // Coordinates for the center of Morocco
                .addTo(map);
        });

        return () => {
            if (map) map.remove();
        };
    }, []);

    return (
        <div >
            <div ref={mapContainerRef} style={{ width: '100%', height: '100vh', cursor: "pointer" }}></div>
        </div>
    )
}

export default page