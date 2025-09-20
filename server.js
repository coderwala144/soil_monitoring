
const express = require('express');
const cors = require('cors');

// Create an Express application
const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Define the port the server will run on
const PORT = process.env.PORT || 3000;

// Function to generate realistic-looking sample data
const generateSoilData = () => {
    // Generate random values within a reasonable range for each parameter
    const ph = (Math.random() * (8.5 - 5.5) + 5.5).toFixed(1); // pH between 5.5 and 8.5
    const moisture = (Math.random() * (60 - 30) + 30).toFixed(1); // Moisture between 30% and 60%
    const temperature = (Math.random() * (35 - 15) + 15).toFixed(1); // Temp between 15°C and 35°C
    const organicMatter = (Math.random() * (2.0 - 0.5) + 0.5).toFixed(1); // Organic matter between 0.5% and 2.0%

    // Return the data as a JSON object
    return {
        ph: parseFloat(ph),
        moisture: parseFloat(moisture),
        temperature: parseFloat(temperature),
        organicMatter: parseFloat(organicMatter),
        timestamp: new Date().toISOString() // Add a timestamp for reference
    };
};

// API endpoint to get a single set of latest soil data
app.get('/api/latest-data', (req, res) => {
    const latestData = generateSoilData();
    res.json(latestData);
});

// API endpoint to get a historical trend for the chart
app.get('/api/vitals-trend', (req, res) => {
    const historicalData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        ph: [6.5, 7.2, 7.0, 6.8, 6.9, 7.1, 7.5],
        moisture: [45, 52, 48, 55, 50, 47, 51],
        temperature: [22, 24, 23, 25, 24, 23, 25],
    };
    res.json(historicalData);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const macronutrientData = [
    {
        field: "North Field",
        date: "2025-09-10",
        nitrogen: 35,
        phosphorus: 18,
        potassium: 42,
        status: "Optimal"
    },
    {
        field: "South Field",
        date: "2025-09-12",
        nitrogen: 22,
        phosphorus: 12,
        potassium: 28,
        status: "Low"
    },
    {
        field: "East Field",
        date: "2025-09-15",
        nitrogen: 40,
        phosphorus: 20,
        potassium: 45,
        status: "Optimal"
    }
];

// API endpoint for macronutrient table
app.get('/api/macronutrients', (req, res) => {
    res.json(macronutrientData);
});
