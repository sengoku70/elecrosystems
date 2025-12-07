const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  id: String,
  brand: String,
  model: String,
  watt: Number,   // for solar
  kw: Number,     // for wind
  price: Number
}, { _id: false });

const countsSchema = new mongoose.Schema({
  solarCount: { type: Number, required: true },
  windCount: { type: Number, required: true }
}, { _id: false });

const costsSchema = new mongoose.Schema({
  solarEquip: Number,
  windEquip: Number,
  equipmentCost: Number,
  installation: Number,
  total: Number
}, { _id: false });

const customSystemSchema = new mongoose.Schema({
  template: { type: String, required: true },  // suburb-house, country-house, etc.

  monthlyUsage: { type: Number, required: true },
  desiredReduction: { type: Number, required: true }, // percentage

  avgSunHours: { type: Number, required: true },
  windCapacityFactor: { type: Number, required: true },

  selectedSolar: { type: equipmentSchema, required: true },
  selectedWind: { type: equipmentSchema, required: true },

  plan: { 
    type: String, 
    enum: ["solarOnly", "windOnly", "mixed"], 
    required: true 
  },

  counts: { type: countsSchema, required: true },
  costs: { type: costsSchema, required: true },

  notes: String,

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CustomSystem", customSystemSchema);
