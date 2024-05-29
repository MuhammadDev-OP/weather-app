"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Map, config, MapStyle, Marker } from "@maptiler/sdk";
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { RadarLayer, TemperatureLayer, WindLayer, ColorRamp } from '@maptiler/weather';
import * as maptilersdk from '@maptiler/sdk';

const Page = () => {
    const mapContainerRef = useRef(null);
    const radarLayerRef = useRef(null);
    const temperatureLayerRef = useRef(null);
    const windLayerRef = useRef(null);
    const pointerDataDivRef = useRef(null);

    useEffect(() => {
        config.apiKey = "Ox6qYDB3T31KuaIOY5fX";

        const map = new Map({
            container: mapContainerRef.current,
            style: "https://api.maptiler.com/maps/ec2ce14d-8665-4b20-be32-d1643f281615/style.json?key=Ox6qYDB3T31KuaIOY5fX",
            center: [-8.0926, 31.7917],
            zoom: 4.5,
            scrollZoom: false,
            geolocateControl: false,
            maptilerLogo: false,
            scaleControl: false,
            fullscreenControl: false,
            hash: true,
            doubleClickZoom: false,
            hash: true
        });

        const updatePointerValue = (lngLat) => {
            console.log("Mouse position:", lngLat);
            if (!lngLat) return;
            const valueWind = windLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            const valueTemp = temperatureLayerRef.current?.pickAt(lngLat.lng, lngLat.lat);
            console.log("Wind value:", valueWind);
            console.log("Temperature value:", valueTemp);
            if (!valueWind || !valueTemp) {
                pointerDataDivRef.current.innerText = "";
                return;
            }
            pointerDataDivRef.current.innerText = `${valueTemp.value.toFixed(1)}°C \n ${valueWind.speedKilometersPerHour.toFixed(1)} km/h`;
        };


        map.on('load', async () => {
            console.log('Map loaded');

            const radarLayerInstance = new RadarLayer({
                apiKey: config.apiKey,
                opacity: 0.7, // Set opacity for the radar layer
            });
            radarLayerRef.current = radarLayerInstance;

            const geojson = await maptilersdk.data.get('857c1df6-0be8-410d-9980-4f5fb6e19f9b');
            map.addSource('geojson-overlay', {
                'type': 'geojson',
                'data': geojson
            });

            map.addLayer({
                'id': 'geojson-overlay-fill',
                'type': 'fill',
                'source': 'geojson-overlay',
                'filter': ['==', '$type', 'Polygon'],
                'layout': {},
                'paint': {
                    'fill-color': '#fff',
                    'fill-opacity': 0.4
                }
            });

            map.addLayer({
                'id': 'geojson-overlay-line',
                'type': 'line',
                'source': 'geojson-overlay',
                'layout': {},
                'paint': {
                    'line-color': 'rgb(68, 138, 255)',
                    'line-width': 3
                }
            });

            map.addLayer({
                'id': 'geojson-overlay-point',
                'type': 'circle',
                'source': 'geojson-overlay',
                'filter': ['==', '$type', 'Point'],
                'layout': {},
                'paint': {
                    'circle-color': 'rgb(68, 138, 255)',
                    'circle-stroke-color': '#fff',
                    'circle-stroke-width': 6,
                    'circle-radius': 7
                }
            });

            const bounds = [Infinity, Infinity, -Infinity, -Infinity];
            const processCoordinates = function (coords) {
                if (Array.isArray(coords[0])) {
                    coords.map(c => processCoordinates(c));
                } else {
                    bounds[0] = Math.min(bounds[0], coords[0]);
                    bounds[1] = Math.min(bounds[1], coords[1]);
                    bounds[2] = Math.max(bounds[2], coords[0]);
                    bounds[3] = Math.max(bounds[3], coords[1]);
                }
            };

            geojson.features.forEach(function (f) {
                if (f.geometry && f.geometry.coordinates) {
                    processCoordinates(f.geometry.coordinates);
                }
            });

            map.fitBounds(bounds, {
                padding: 20
            });

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
        }).setLngLat([-8.0926, 31.7917]) // Marker coordinates
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
