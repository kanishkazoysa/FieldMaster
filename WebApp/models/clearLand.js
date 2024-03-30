const mongoose = require("mongoose");

const clearLandSchema = mongoose.Schema(
    {
        WeedType: {
            type: String,
        },
        
        // PlantType: {
        //     type: String,
        // },
        // PlantCount: {
        //     type: String,
        // },
        PlantDetails: {
            type: [String],
        },
        // StonesType: {
        //     type: String,
        // },
        // StonesCount: {
        //     type: String,
        // },
        StoneDetails: {
            type: [String],
        },
        LaborsCOunt: {
            type: String,
        },
        
        WorkHoursCount: {
            type: String,
        },
        // Machinetype: {
        //     type: String,
        // },
        // MachineCount: {
        //     trpe: String,
        // },
        MachineDetails: {
            type: [String],
        },
    }
    );

const clearLandModel = mongoose.model("clearLand", clearLandSchema);
module.exports = clearLandModel;
