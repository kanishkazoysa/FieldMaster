const express = require("express");
const router = express.Router();
const plantationModel = require("../models/plantation");

function calculateNumberOfPlants  (area, plantSpacing, rowSpacing) {
    // Assuming area is in acres and plantSpacing, rowSpacing are in meters
    // Convert area to square meters
    const areaInSquareMeters = area * 4046.86;

    // Calculate the area required for each plant (product of plant spacing and row spacing)
    const areaPerPlant = plantSpacing * rowSpacing;

    // Calculate the number of plants that can be planted in the given area
    const numberOfPlants = Math.floor(areaInSquareMeters / areaPerPlant);

    return numberOfPlants;
};

function calculatePlantDensity  (area,numberOfPlants) {
    const areaInSquareMeters = area * 4046.86;   
    const plantDensity = Math.floor(numberOfPlants/areaInSquareMeters);

    return plantDensity;
};


function convertToCommonUnit(value,unit){
    if(unit==='cm'){
        return value/100;
    }else{
        return value;
    }
}

router.post("/plantation", async (req, res) => {
   
    
    try{
        const { textplantspace,textRowspace,textPlant} = req.body;
        const area = 100; // Acres
        const plantSpacing = textplantspace; // Meter
        const rowSpacing = textRowspace; // Meter
       

        const numberOfPlants = calculateNumberOfPlants(area, plantSpacing, rowSpacing);
        const calculatedPlantDensity=(area,numberOfPlants);
        
        console.log("Number of plants:", numberOfPlants);
        res.json({status:"ok" , data: "Counted the no of plants"});

        const newPlantation = new plantationModel({
            PlantType : textPlant,
            PlantSpace : textplantspace,
            RowSpace :textRowspace ,
            NoOfPlants : numberOfPlants,
        })
      
        await newPlantation.save();
        
        res.json({status:"ok" , data: "Plantation Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
    
})


module.exports = router;