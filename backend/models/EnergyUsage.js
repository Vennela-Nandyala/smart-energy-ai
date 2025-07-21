const mongoose = require('mongoose');

const energyUsageSchema = new mongoose.Schema({
  device: { type: String, required: true },
  usage: { type: Number, required: true }, // in kWh
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EnergyUsage', energyUsageSchema);
