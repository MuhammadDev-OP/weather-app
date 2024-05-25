"use client"

import React, { useRef, useEffect } from 'react';
import { Map, config, MapStyle, Marker } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer } from '@maptiler/weather';

const page = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);

    useEffect(() => {
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        const map = new Map({
            container: mapContainerRef.current,
            style: MapStyle.BRIGHT.DARK,
            center: [17.2283, 26.3351], // Algeria center coordinates
            zoom: 4.5,
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

            map.addLayer(radarLayerInstance);
            await radarLayerInstance.onSourceReadyAsync();

            const animationSpeed = 1000;
            radarLayerInstance.animate(animationSpeed);

            const marker = new Marker({
                color: "#dc2626",
                draggable: true,
            }).setLngLat([17.2283, 26.3351]) // Marker coordinates
                .addTo(map);
        });

        return () => {
            if (map) map.remove();
        };
    }, []);

    return (
        <div ref={mapContainerRef} style={{ width: '100%', height: '100vh', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}></div>
    );
};

export default page;
