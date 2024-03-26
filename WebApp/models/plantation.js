const mongoose = require("mongoose");

const plantationSchema = mongoose.Schema(
    {
        PlantType: {
            type: String,
        },
        PlantSpace: {
            type: String,
        },
        RowSpace: {
            type: String,
        },
       
    }
); 

const plantationModel = mongoose.model("plantation", plantationSchema);
module.exports = plantationModel;     