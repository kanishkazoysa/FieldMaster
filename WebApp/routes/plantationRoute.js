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
    const numplant = numberOfPlants; 
    const plantDensity = Math.floor(numplant/areaInSquareMeters);

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
        const calculatedPlantDensity = calculatePlantDensity(area,numberOfPlants);
        
        console.log("Number of plants:", numberOfPlants);
        //rres.json({status:"ok" , data: "Counted the no of plants"});

        const newPlantation = new plantationModel({
            PlantType : textPlant,
            PlantSpace : textplantspace,
            RowSpace :textRowspace ,
            NoOfPlants : numberOfPlants,
            PlantDensity : calculatedPlantDensity
        })
      
        await newPlantation.save();
        
        res.json({status:"ok" , data: "Plantation Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
    
})

router.get("/numberOfPlants", async (req, res) => {
    try {
        const plant= await plantationModel.findOne().sort({ _id: -1 });

        if (!plant) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const numberOfPlants = plant.NoOfPlants;

        res.json({ status: "success", data: numberOfPlants });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get("/plantDensity", async (req, res) => {
    try {
        const plant= await plantationModel.findOne().sort({ _id: -1 });

        if (!plant) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const plantationDensity = plant.plantDensity;

        res.json({ status: "success", data: plantationDensity });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


module.exports = router;