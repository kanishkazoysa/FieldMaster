const express = require("express");
const router = express.Router();
const fertilizerModel = require("../models/fertilizer");

router.post("/fertilizer", async (req, res) => {
   
    
    try{
        const { textFertilizationType,textFertilizationNUmberoftime,textFertilizationAmount} = req.body;
        const area = 100; // Acres

        const newFertilizer = new fertilizerModel({
            AmountOfOneTime: textFertilizationAmount,
            NoOfTimes: textFertilizationNUmberoftime,
            FertilizerType: textFertilizationType
        })
      
        await newFertilizer.save();
        
        res.json({status:"ok" , data: "Fertilizer Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
    
})


module.exports = router;