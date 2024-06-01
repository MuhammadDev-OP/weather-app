"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Map, config, MapStyle, Marker } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer, TemperatureLayer, WindLayer, ColorRamp, PrecipitationLayer } from '@maptiler/weather';
import * as maptilersdk from '@maptiler/sdk';

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
            center: [13.1897, 32.8872], // Coordinates for Tripoli, Libya
            zoom: 4.5,
            scrollZoom: true,
            geolocateControl: false,
            maptilerLogo: false,
            scaleControl: false,
            fullscreenControl: false,
            hash: true,
            doubleClickZoom: false,
        });

        const updatePointerValue = (lngLat) => {
            console.log("Mouse position:", lngLat);
            if (!lngLat) return;
            const valueWind = windLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            const valueTemp = temperatureLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            const valueRain = precipitationLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            console.log("Wind value:", valueWind);
            console.log("Temperature value:", valueTemp);
            console.log("Rain value:", valueRain);
            if (!valueWind || !valueTemp || !valueRain) {
                pointerDataDivRef.current.innerText = "";
                return;
            }
            pointerDataDivRef.current.innerText = `${valueTemp.value.toFixed(1)}°C \n ${valueWind.speedKilometersPerHour.toFixed(1)} km/h \n ${valueRain.value.toFixed(1)} mm/h`;
        };

        map.on('load', async () => {
            console.log('Map loaded');

            const radarLayerInstance = new RadarLayer({
                apiKey: config.apiKey,
                opacity: 0.7, // Set opacity for the radar layer
            });
            radarLayerRef.current = radarLayerInstance;

            // const geojson = await maptilersdk.data.get('857c1df6-0be8-410d-9980-4f5fb6e19f9b');
            // map.addSource('geojson-overlay', {
            //     'type': 'geojson',
            //     'data': geojson
            // });

            // const bounds = [Infinity, Infinity, -Infinity, -Infinity];
            // const processCoordinates = function (coords) {
            //     if (Array.isArray(coords[0])) {
            //         coords.map(c => processCoordinates(c));
            //     } else {
            //         bounds[0] = Math.min(bounds[0], coords[0]);
            //         bounds[1] = Math.min(bounds[1], coords[1]);
            //         bounds[2] = Math.max(bounds[2], coords[0]);
            //         bounds[3] = Math.max(bounds[3], coords[1]);
            //     }
            // };

            // geojson.features.forEach(function (f) {
            //     if (f.geometry && f.geometry.coordinates) {
            //         processCoordinates(f.geometry.coordinates);
            //     }
            // });

            // map.fitBounds(bounds, {
            //     padding: 20
            // });

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

            map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.6)");

            map.addLayer(windLayer);
            map.addLayer(temperatureLayerInstance, "Water");
            map.addLayer(precipitationLayerInstance, "Water");

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

            const toggleLayers = () => {
                if (activeLayer === 'temperature') {
                    temperatureLayerInstance.setOpacity(0.7);
                    windLayer.setOpacity(0);
                    precipitationLayerInstance.setOpacity(0);
                } else if (activeLayer === 'wind') {
                    temperatureLayerInstance.setOpacity(0);
                    windLayer.setOpacity(0.8);
                    precipitationLayerInstance.setOpacity(0);
                } else if (activeLayer === 'rain') {
                    temperatureLayerInstance.setOpacity(0);
                    windLayer.setOpacity(0);
                    precipitationLayerInstance.setOpacity(0.7);
                }
            };

            toggleLayers();
        });

        const marker = new Marker({
            element: document.createElement('div')
        }).setLngLat([13.1897, 32.8872]) // Coordinates for Tripoli, Libya
            .addTo(map);

        const markerElement = marker.getElement();
        markerElement.style.backgroundImage = 'url("/libya1.png")';
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
            radarLayerRef.current.setOpacity(showRadar ? 0 : 0.5);
        }
    };

    const toggleTemperatureLayer = () => {
        if (temperatureLayerRef.current) {
            setShowTemperature(!showTemperature);
            temperatureLayerRef.current.setOpacity(showTemperature ? 0 : 0.9);
        }
    };

    const toggleWindLayer = () => {
        if (windLayerRef.current) {
            setShowWind(!showWind);
            windLayerRef.current.setOpacity(showWind ? 0 : 0.5);
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
            <div style={{ position: 'absolute', bottom: '40px', gap: "10px", left: '10px', zIndex: 1 }}>
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
