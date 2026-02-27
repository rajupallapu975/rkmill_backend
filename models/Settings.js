const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    id: {
        type: String,
        default: 'global_settings',
        unique: true
    },
    kvaThreshold: { type: Number, default: 104.0 },
    kwThreshold: { type: Number, default: 104.0 },
    kvaAlert: { type: Number, default: 100.0 },
    kwAlert: { type: Number, default: 100.0 },
    pfLimit: { type: Number, default: 0.90 },
    pfAlert: { type: Number, default: 0.85 },
    lockedKwh: { type: Number, default: 0 },
    lockStartTime: { type: Date, default: null },
    updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model('Settings', SettingsSchema);
module.exports = Settings;
