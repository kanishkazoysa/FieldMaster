const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
});

const GateSchema = new mongoose.Schema({
  length: Number,
  count: Number,
});

const FenceSetupSchema = new mongoose.Schema({
  fenceType: String,
  postSpacing: Number,
  postSpacingUnit: String,
  gates: [GateSchema],
  numberOfSticks: Number,
});

const PartitionPolygonSchema = new mongoose.Schema({
  points: {
    type: [PointSchema],
    default: [],
  },
  area: {
    type: Number,
    required: true,
  },
  perimeter: {
    type: Number,
    required: true,
  },

  label: {
    type: String,
    default: '',
  },

  plantationSetup: {
    plantType: String,
    plantSpacing: Number,
    rowSpacing: Number,
    numberOfPlants: Number,
    plantationDensity: Number,
    fertilizerData: {
      fertilizerType: String,
      fertilizerFrequency: String,
      fertilizerTimes: Number,
      fertilizerAmount: Number,
      fertilizerUnit: String,
      totalFertilizerPerYear: Number,
      fertilizerPerPlant: Number,
    },
  },

  fenceSetup: FenceSetupSchema,
});

/* this schema is used to save map template */
const MapTemplateSchema = new mongoose.Schema({
  perimeter: {
    type: Number,
  },
  area: {
    type: Number,
  },
  templateName: {
    type: String,
  },
  measureName: {
    type: String,
  },
  landType: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
  locationPoints: {
    type: [PointSchema],
    default: [],
  },
  userId: {
    type: String,
    required: true,
  },
  partitionPolygons: {
    type: [PartitionPolygonSchema],
    default: [],
  },
});

module.exports = mongoose.model('MapTemplate', MapTemplateSchema);