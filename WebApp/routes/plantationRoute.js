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

function calculatePlantationDensity(area, plantSpacingInMeters, rowSpacingInMeters) {
    // Convert area to square meters
    const areaInSquareMeters = parseFloat(area) * 4046.86;

    // Convert spacing values to numbers
    const plantSpacing = parseFloat(plantSpacingInMeters);
    const rowSpacing = parseFloat(rowSpacingInMeters);

    // Calculate the area required for each plant (product of plant spacing and row spacing)
    const areaPerPlant = plantSpacing * rowSpacing;

    // Calculate the number of plants that can be planted in the given area
    const numberOfPlants = Math.floor(areaInSquareMeters / areaPerPlant);

    // Calculate the plantation density
    const plantationDensity = numberOfPlants / areaInSquareMeters;

    return plantationDensity;
}


function convertToCommonUnit(value,unit){
    if(unit==='cm'){
        return value/100;
    }else{
        return value;
    }
}

router.post("/plantation", async (req, res) => {
    try {
        const { textplantspace, textRowspace, textPlant } = req.body;
        const area = 100; // Acres

        // Convert spacing values to meters if given in centimeters
        const plantSpacing = convertToMeters(parseFloat(textplantspace), 'cm');
        const rowSpacing = convertToMeters(parseFloat(textRowspace), 'cm');

        // Calculate number of plants and plantation density
        const numberOfPlants = calculateNumberOfPlants(area, plantSpacing, rowSpacing);
        const calculatedPlantDensity = calculatePlantationDensity(area, plantSpacing, rowSpacing);

        // Log and save data
        console.log("Number of plants:", numberOfPlants);
        console.log(`Plantation Density: ${calculatedPlantDensity} plants `);

        const newPlantation = new plantationModel({
            PlantType: textPlant,
            PlantSpace: textplantspace,
            RowSpace: textRowspace,
            NoOfPlants: numberOfPlants,
            PlantDensity: calculatedPlantDensity
        });

        await newPlantation.save();

        res.json({ status: "ok", data: "Plantation Created" });
    } catch (error) {
        res.status(500).json({ status: "error", data: error.message });
    }
});


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