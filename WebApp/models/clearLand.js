const mongoose = require("mongoose");

const ClearLandSchema = mongoose.Schema(
    {
        WeedType:{
            type: String,
        },
        PlantType: {
            type: String,
        },
        PlantCount: {
            type: String,
        },
        StonesType: {
            type: String,
        },
        StonesCount: {
            type: String,
        },
        LaborsCOunt: {
            type: String,
        },
        WorkHoursCount: {
            type: String,
        },
        Machinetype: {
            type: String,
        },
        MachineCount: {
            trpe: String,
        }


    });
