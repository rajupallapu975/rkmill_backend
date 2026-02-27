const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
    totalKw: {
        type: Number,
        required: true
    },
    totalKva: {
        type: Number,
        required: true
    },
    avgPf: {
        type: Number,
        required: true
    },
    totalNetKwh: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // TTL Index: automatically delete document after 24 hours
    }
});

// Create an index on the 'createdAt' field to ensure the TTL index works.
// Mongoose creates this in the background when the model is compiled.
const SensorData = mongoose.model('SensorData', SensorDataSchema);

module.exports = SensorData;
