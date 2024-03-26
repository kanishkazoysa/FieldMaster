const mongoose = require("mongoose");

const fertilizerSchema = mongoose.Schema(
    {
        // TimePeriod: {
        //     type: String,
        // },
        FertilizerType: {
            type: String,
        },
        NoOfTimes: {
            type: String,
        },
        AmountOfOneTime: {
            type: String,
        }
    }
); 

const fertilizerModel = mongoose.model("fertilizer", fertilizerSchema);
module.exports = fertilizerModel;       