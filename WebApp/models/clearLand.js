const mongoose = require("mongoose");

const clearLandSchema = mongoose.Schema(
    {
        WeedType: {
            type: String,
        },
        PlantDetails: {
            type: [String],
        },
        StoneDetails: {
            type: [String],
        },
        LaborsCOunt: {
            type: String,
        },
        WorkHoursCount: {
            type: String,
        },
        MachineDetails: {
            type: [String],
        },
    }
    );

const clearLandModel = mongoose.model("clearLand", clearLandSchema);
module.exports = clearLandModel;
