const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
});

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
});

module.exports = mongoose.model('MapTemplate', MapTemplateSchema);