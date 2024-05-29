// pages/api/weatherData.js
import fs from "fs";
import path from "path";
import csv from "csv-parser";

export default function handler(req, res) {
  const results = [];
  const filePath = path.join(process.cwd(), "data", "data.csv");

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ";" }))
    .on("data", (data) => {
      data.VALUE = parseFloat(data.VALUE.replace(",", ".")); // Convert value to float
      results.push(data);
    })
    .on("end", () => {
      res.status(200).json(results);
    })
    .on("error", (error) => {
      res.status(500).json({ error: error.message });
    });
}
