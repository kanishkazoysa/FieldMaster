const mongoose = require('mongoose');

const MapTemplateSchema = new mongoose.Schema({
  perimeter: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  templateName: {
    type: String,
    required: true,
  },
  measureName: {
    type: String,
    required: true,
  },
  landType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10),
  },
  time: {
    type: String,
    default: () => new Date().toLocaleTimeString(),
  },
});

module.exports = mongoose.model('MapTemplate', MapTemplateSchema);
