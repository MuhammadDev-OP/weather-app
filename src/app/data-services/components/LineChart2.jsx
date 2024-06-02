"use client"

import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
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
            const response = await fetch("/data/data.csv");
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
                        acc[stationName].push({
                            x: new Date(entry.DATE),
                            y: parseFloat(entry.VALUE.replace(',', '.')) || 0, // Handle potential parsing errors
                        });
                        return acc;
                    }, {});

                // Create series data for each station
                const seriesData = Object.keys(groupedData).map(stationName => ({
                    name: stationName,
                    data: groupedData[stationName],
                }));

                setChartData({
                    series: seriesData,
                });
            },
        });
    };

    const { series } = chartData;
    const chartOptions = {
        colors: ['#79e200', '#f39c12', '#8e44ad', '#e74c3c'], // Different shades of blue for rain theme
        theme: {
            mode: "dark",
        },
        stroke: {
            curve: "smooth",
            width: 3, // Adjust line thickness
        },
        markers: {
            size: 5, // Adjust marker size
            colors: ['#00aaff'], // Marker color to match rain theme
            strokeColors: '#ffffff', // White border for markers
            strokeWidth: 2,
        },
        chart: {
            type: "line",
            height: 750,
            toolbar: {
                show: true,
                tools: {
                    download: false, // Disable download tool
                    selection: true, // Enable selection tool for zooming
                    zoom: true, // Enable zooming tool
                    zoomin: true,
                    zoomout: true,
                    pan: true, // Enable panning tool
                    reset: true, // Enable reset tool to reset zoom level
                },
            },
            zoom: {
                enabled: true,
            },
            background: "#001f3f", // Dark blue background
        },
        legend: {
            show: true,
            labels: {
                colors: '#ffffff', // White text for legend labels
            },
        },
        yaxis: {
            title: {
                text: "Rain (mm)",
                style: {
                    color: '#00aaff', // Light blue for axis title
                }
            },
            labels: {
                style: {
                    colors: '#ffffff', // White text for y-axis labels
                }
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                },
                style: {
                    colors: '#ffffff', // White text for x-axis labels
                }
            },
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => `${val.toFixed(2)} mm`,
            },
            theme: "dark",
        },
        grid: {
            borderColor: '#444', // Darker grid lines for better contrast
        },
    };

    return (
        <>
            {typeof window !== 'undefined' && (
                <Chart
                    options={chartOptions}
                    series={series}
                    type="line"
                    height={chartOptions.chart.height}
                />
            )}
        </>
    );
};

export default LineChart2;
