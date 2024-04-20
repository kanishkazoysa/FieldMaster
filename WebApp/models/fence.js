const mongoose = require('mongoose');

const fenceSchema = mongoose.Schema({
  templateId: {
    type: String,
  },
  FenceType: {
    type: String,
  },
  PostSpace: {
    type: String,
  },
  PostSpaceUnit: {
    type: String,
  },
  Gatelength: {
    type: String,
  },
  NumberofGates: {
    type: String,
  },
});

const fenceModel = mongoose.model('fence', fenceSchema);
module.exports = fenceModel;
