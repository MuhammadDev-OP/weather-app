"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Map, config, MapStyle, Marker } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer, TemperatureLayer, WindLayer, ColorRamp } from '@maptiler/weather';

const Page = () => {
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
            center: [17.2283, 26.3351], // Centering on Morocco
            zoom: 4.5, // Adjusted zoom level to focus on Morocco
            scrollZoom: false,
            geolocateControl: false,
            maptilerLogo: false,
            scaleControl: false,
            fullscreenControl: false,
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
        const marker = new Marker({
            color: "#dc2626",
            draggable: true,
        }).setLngLat([17.2283, 26.3351]) // Marker coordinates
            .addTo(map);


        return () => {
            if (map) map.remove();
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
            <div
                ref={pointerDataDivRef}
                style={{
                    position: 'absolute',
                    top: '100px',
                    left: '10px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '5px',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
};

export default Page;
