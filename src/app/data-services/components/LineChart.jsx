import React from 'react';
import Chart from "react-apexcharts";
import Papa from "papaparse";

const LineChart = ({ chartData, updateChartData }) => {

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

                // Call the callback function passed as props to update the chart data
                updateChartData(seriesData);
            },
        });
    };

    fetchCSVData();

    return (
        <>
            <Chart
                options={chartData.chartOptions}
                series={chartData.series}
                type="line"
                height={chartData.chartOptions.chart.height}
            />
        </>
    );
};

export default LineChart;
