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


const WeedDataSchema = new mongoose.Schema({
  weedType: String,
  labourCount: Number,
  workHours: Number,
  machineList: [String],
  weedCalculationResults: {
    weedEffort: Number,
    totalTime: Number,
  },
});

const PlantDataSchema = new mongoose.Schema({
  plantList: [String],
  plantWorkHours: Number,
  plantMachineList: [String],
  plantCalculationResults: {
    plantEffort: Number,
    totalTime: Number,
  },
});

const StoneDataSchema = new mongoose.Schema({
  stoneList: [String],
  stoneWorkHours: Number,
  stoneMachineList: [String],
  stoneCalculationResults: {
    stoneEffort: Number,
    totalTime: Number,
  },
});

const ClearLandSetupSchema = new mongoose.Schema({
  weedData: WeedDataSchema,
  plantData: PlantDataSchema,
  stoneData: StoneDataSchema,
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
  clearLandSetup: ClearLandSetupSchema,

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