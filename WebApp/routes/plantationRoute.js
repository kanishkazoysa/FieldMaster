const express = require("express");
const router = express.Router();
const plantationModel = require("../models/plantation");


router.post("/plantation", async (req, res) => {
   
    
    try{
        const { textplantspace,textRowspace,textPlant} = req.body;
        
        const newPlantation = new plantationModel({
            PlantType : textPlant,
            PlantSpace : textplantspace,
            RowSpace :textRowspace 
    
        })
      
        await newPlantation.save();

        res.json({status:"ok" , data: "Plantation Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
    
})


module.exports = router;