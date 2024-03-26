const mongoose = require("mongoose");

const plantationSchema = mongoose.Schema(
    {
        PlantType: {
            type: String,
        },
        PlantSpace: {
            type: int,
        },
        RowSpace: {
            type: int,
        },
       
    }
); 

const plantationModel = mongoose.model("plantation", plantationSchema);
module.exports = plantationModel;     