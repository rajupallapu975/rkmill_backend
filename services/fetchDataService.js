const axios = require('axios');
const SensorData = require('../models/SensorData');

const fetchDataAndSave = async () => {
    try {
        const apiUrl = 'http://Gfiotsolutions.com/api/sensordata';

        console.log(`[${new Date().toISOString()}] Fetching data from ${apiUrl}...`);
        const response = await axios.get(apiUrl);

        const rawData = response.data[0]; // Extract the first object from the response array

        // Save only specific parameters for meter 1
        const newRecord = new SensorData({
            totalKw: rawData.Total_KW_meter_1,
            totalKva: rawData.Total_KVA_meter_1,
            avgPf: rawData.Avg_PF_meter_1,
            totalNetKwh: rawData.TotalNet_KWH_meter_1
        });

        await newRecord.save();
        console.log(`[${new Date().toISOString()}] Successfully saved sensor data to database.`);

    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error fetching or saving data:`, error.message);
    }
};

module.exports = { fetchDataAndSave };
