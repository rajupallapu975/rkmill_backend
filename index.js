const dns = require('dns');
dns.setServers(['8.8.8.8']);
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const { startCronJobs } = require('./cronScheduler');
const SensorData = require('./models/SensorData');

// Initialize Express App (Optional: if we want to serve routes later)
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Basic endpoint to manually trigger a fetch or check health API
app.get('/', (req, res) => {
    res.send('PowerX Backend is running. Sensor data fetching is scheduled.');
});

const { fetchDataAndSave } = require('./services/fetchDataService');

// Manual fetch trigger
app.get('/api/fetch', async (req, res) => {
    try {
        await fetchDataAndSave();
        res.json({ message: 'Manual fetch successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const Settings = require('./models/Settings');

// Get current settings
app.get('/api/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne({ id: 'global_settings' });
        if (!settings) {
            settings = await Settings.create({ id: 'global_settings' });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Failed' });
    }
});

// Update settings (kvaThreshold, kwThreshold, pfLimit, lockedKwh, lockStartTime)
app.post('/api/settings', async (req, res) => {
    try {
        const updateData = { ...req.body, updatedAt: Date.now() };
        let settings = await Settings.findOneAndUpdate(
            { id: 'global_settings' },
            updateData,
            { new: true, upsert: true }
        );
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Update Failed' });
    }
});

// Example route to see the currently stored data
app.get('/api/data', async (req, res) => {
    try {
        const data = await SensorData.find().sort({ createdAt: -1 }).limit(10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});

// Define Startup Method
const startServer = async () => {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Start Cron Jobs
    startCronJobs();

    // 3. Start Express Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
