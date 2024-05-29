"use client"

import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Papa from "papaparse";

const LineChart = () => {
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
                const seriesData = data
                    .filter(entry => entry.DATE && entry.VALUE) // Ensure DATE and VALUE exist
                    .map((entry) => ({
                        x: new Date(entry.DATE),
                        y: parseFloat(entry.VALUE.replace(',', '.')) || 0, // Handle potential parsing errors
                    }));

                setChartData({
                    series: [{ name: "Temperature", data: seriesData }],
                });
            },
        });
    };

    const { series } = chartData;
    const chartOptions = {
        colors: ['#79e200'], // Setting line color to green
        theme: {
            mode: "dark",
        },
        stroke: {
            curve: "smooth",
            width: 3, // Adjust line thickness
        },
        markers: {
            size: 6, // Adjust marker size
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
            background: "black",
        },
        legend: {
            show: false,
        },
        yaxis: {
            title: {
                text: "Temperature",
            },
        },
        xaxis: {
            type: "datetime",
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                },
            },
        },
        tooltip: {
            shared: false,
            y: {
                formatter: (val) => `${val.toFixed(2)}`,
            },
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

export default LineChart;
