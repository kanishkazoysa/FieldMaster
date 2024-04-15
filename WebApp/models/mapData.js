
const mongoose = require('mongoose');

const polylineDataSchema = new mongoose.Schema({
  coordinates: {
    type: Array, // Store polyline coordinates as an array of objects
    required: true,
  },
  area : {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const PolylineData = mongoose.model('PolylineData', polylineDataSchema);

module.exports = PolylineData;
