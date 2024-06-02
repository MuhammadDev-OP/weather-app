"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Map, config, Marker } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer, TemperatureLayer, WindLayer, ColorRamp, PrecipitationLayer } from '@maptiler/weather';

const Page = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);
    const temperatureLayerRef = useRef(null);
    const windLayerRef = useRef(null);
    const precipitationLayerRef = useRef(null);
    const pointerDataDivRef = useRef(null);

    const [showRadar, setShowRadar] = useState(true);
    const [showTemperature, setShowTemperature] = useState(true);
    const [showWind, setShowWind] = useState(true);

    useEffect(() => {
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        const map = new Map({
            container: mapContainerRef.current,
            style: "https://api.maptiler.com/maps/5e221be6-85d2-4854-85eb-e3de565178ef/style.json?key=Ox6qYDB3T31KuaIOY5fX#1.01/0/-48.8",
            center: [9.0, 34.0], // Coordinates for Tripoli, Libya
            zoom: 4.5,
            scrollZoom: true,
            scaleControl: false,
            fullscreenControl: false,
            hash: true,
            doubleClickZoom: false,
        });

        const updatePointerValue = async (lngLat) => {
            if (!lngLat) return;

            try {
                const valueWind = windLayerRef.current ? await windLayerRef.current.pickAt(lngLat.lng, lngLat.lat) : null;
                const valueTemp = temperatureLayerRef.current ? await temperatureLayerRef.current.pickAt(lngLat.lng, lngLat.lat) : null;
                const valueRain = radarLayerRef.current ? await radarLayerRef.current.pickAt(lngLat.lng, lngLat.lat) : null;

                if (!valueWind && !valueTemp && !valueRain) {
                    pointerDataDivRef.current.innerText = "";
                    return;
                }
                const windText = valueWind ? `${valueWind.speedKilometersPerHour.toFixed(1)} km/h` : "No data";
                const tempText = valueTemp ? `${valueTemp.value.toFixed(1)}°C` : "No data";
                const rainText = valueRain ? `${valueRain.value.toFixed(1)} mm/h` : "No data";

                pointerDataDivRef.current.innerText = `
                    Temperature: ${tempText}
                    Wind Speed: ${windText}
                    Rainfall: ${rainText}
                `;
            } catch (error) {
                console.error('Error updating pointer value:', error);
            }
        };

        map.on('load', async () => {
            console.log('Map loaded');

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

            const precipitationLayerInstance = new PrecipitationLayer({
                apiKey: config.apiKey,
                opacity: 0.7, // Set opacity for the precipitation layer
            });
            precipitationLayerRef.current = precipitationLayerInstance;

            map.addLayer(radarLayerInstance);
            map.addLayer(temperatureLayerInstance, "Water");
            map.addLayer(precipitationLayerInstance, "Water");
            map.addLayer(windLayer);

            await radarLayerInstance.onSourceReadyAsync();
            await temperatureLayerInstance.onSourceReadyAsync();
            await precipitationLayerInstance.onSourceReadyAsync();

            const animationSpeed = 1000;
            radarLayerInstance.animate(animationSpeed);
            temperatureLayerInstance.animate();
            precipitationLayerInstance.animate();

            map.on('mousemove', (e) => {
                updatePointerValue(e.lngLat);
            });
        });

        const marker = new Marker({
            element: document.createElement('div')
        }).setLngLat([10.1815, 36.8065])
            .addTo(map);

        const markerElement = marker.getElement();
        markerElement.style.backgroundImage = 'url("/tunisia1.png")';
        markerElement.style.backgroundSize = 'cover';
        markerElement.style.width = '50px';
        markerElement.style.height = '50px';
        markerElement.style.borderRadius = '3px';

        return () => {
            if (map) map.remove();
        };
    }, []);

    const toggleRadarLayer = () => {
        if (radarLayerRef.current) {
            setShowRadar(!showRadar);
            radarLayerRef.current.setOpacity(showRadar ? 0 : 0.9); // Set opacity to 0.9 when showing
        }
    };

    const toggleTemperatureLayer = () => {
        if (temperatureLayerRef.current) {
            setShowTemperature(!showTemperature);
            temperatureLayerRef.current.setOpacity(showTemperature ? 0 : 0.9); // Set opacity to 0.9 when showing
        }
    };

    const toggleWindLayer = () => {
        if (windLayerRef.current) {
            setShowWind(!showWind);
            windLayerRef.current.setOpacity(showWind ? 0 : 0.9); // Set opacity to 0.9 when showing
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
            <div
                ref={pointerDataDivRef}
                style={{
                    position: 'absolute',
                    top: '120px',
                    left: '10px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '5px',
                    zIndex: 1,
                    pointerEvents: 'none',
                }}
            />
            <div style={{ position: 'absolute', bottom: '40px', gap: "10px", left: '10px', zIndex: 1, display: 'flex' }}>
                <div>
                    <button onClick={toggleRadarLayer} className='px-4 py-2 bg-blue-600 text-white rounded'>
                        Toggle Rain Layer
                    </button>
                </div>
                <div>
                    <button onClick={toggleTemperatureLayer} className='px-4 py-2 bg-amber-500 text-white rounded'>
                        Toggle Temperature Layer
                    </button>
                </div>
                <div>
                    <button onClick={toggleWindLayer} className='px-4 py-2 bg-slate-500 text-white rounded'>
                        Toggle Wind Layer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;
