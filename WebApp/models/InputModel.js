const mongoose = require("mongoose");

const InputSchema = mongoose.Schema(
    {  
        Type: {
            type: String,
        },
        Name: {
            type: String,
        },
        
    }
); 

const InputModel = mongoose.model("inputs", InputSchema);
module.exports = InputModel;