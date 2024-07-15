"use client";

import { useState, useEffect } from "react";
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import Papa from "papaparse";

const LineChart2 = () => {
    const [chartData, setChartData] = useState({
        series: [],
    });

    useEffect(() => {
        fetchCSVData();
    }, []);

    const fetchCSVData = async () => {
        try {
            const response = await fetch("/data/Daily_Data_RR.csv");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const csvText = await response.text();
            parseCSVData(csvText);
        } catch (error) {
            console.error("An error occurred while fetching the CSV data:", error);
        }
    };

    const parseCSVData = (csvText) => {
        Papa.parse(csvText, {
            header: true,
            delimiter: ";",
            complete: (result) => {
                const data = result.data;

                // Group data by station name
                const groupedData = data
                    .filter(entry => entry.DATE && entry.VALUE && entry.VARNAME === 'RR.QUOT') // Filter for rain data
                    .reduce((acc, entry) => {
                        const stationName = entry.STATIONAME;
                        if (!acc[stationName]) {
                            acc[stationName] = [];
                        }
                        acc[stationName].push([new Date(entry.DATE).getTime(), parseFloat(entry.VALUE.replace(',', '.')) || 0]); // Handle potential parsing errors
                        return acc;
                    }, {});

                // Create series data for each station
                const seriesData = Object.keys(groupedData).map(stationName => ({
                    text: stationName,
                    values: groupedData[stationName],
                }));

                setChartData({
                    series: seriesData,
                });
            },
        });
    };

    const { series } = chartData;
    const chartConfig = {
        type: "line",
        title: {
            text: "Rainfall Data",
            fontColor: "#000000"
        },
        backgroundColor: "#ffffff",
        legend: {
            draggable: true,
            borderWidth: "0px",
            item: {
                cursor: "hand",
                fontColor: "#000000"
            },
            header: {
                text: "Stations",
                fontColor: "#000000",
                backgroundColor: "#ffffff"
            }
        },
        plot: {
            aspect: "spline",
            marker: {
                backgroundColor: "#00aaff",
                borderWidth: "2px",
                borderColor: "#ffffff"
            }
        },
        scaleX: {
            transform: {
                type: "date",
                all: "%D %M %dd<br>%Y"
            },
            item: {
                fontColor: "#000000"
            }
        },
        scaleY: {
            label: {
                text: "Rain (mm)",
                fontColor: "#000000"
            },
            item: {
                fontColor: "#000000"
            },
            zooming: true, // Enable zooming
        },
        crosshairX: {
            lineColor: "#000000",
            marker: {
                borderColor: "#000000",
                borderWidth: "1px",
                size: "5px"
            },
            plotLabel: {
                backgroundColor: "#000000",
                borderRadius: "2px",
                borderWidth: "2px",
                multiple: true,
                fontColor: "#ffffff"
            }
        },
        tooltip: {
            text: "%kt<br>%vv mm",
            backgroundColor: "#000000",
            borderRadius: "5px",
            borderWidth: "2px",
            fontColor: "#ffffff"
        },
        preview: {
            adjustLayout: true, // Enable preview area for zooming
        },
        series: series
    };

    return (
        <div style={{ width: "100%", height: "750px" }}>
            <ZingChart data={chartConfig} />
        </div>
    );
};

export default LineChart2;
