const express = require("express");
const router = express.Router();
const plantationModel = require("../models/plantation");

function calculateNumberOfPlants(area, plantSpacing, rowSpacing) {
    const areaInSquareMeters = parseFloat(area) * 4046.86;
    const areaPerPlant = plantSpacing * rowSpacing;
    const numberOfPlants = Math.floor(areaInSquareMeters / areaPerPlant);
    return numberOfPlants;
}

function RoundToTwoDecimals(number) {
    return Math.round(number * 100) / 100;
}
function calculatePlantationDensity(area, plantSpacing, rowSpacing) {
    const areaInSquareMeters = parseFloat(area) * 4046.86;

    // const plantSpacing = parseFloat(plantSpacingInMeters);
    // const rowSpacing = parseFloat(rowSpacingInMeters);

    const areaPerPlant = plantSpacing * rowSpacing;
    const numberOfPlants = Math.floor(areaInSquareMeters / areaPerPlant);
    const plantationDensity = RoundToTwoDecimals(numberOfPlants / areaInSquareMeters);

    return plantationDensity;
}


function convertToCommonUnit(value, unit) {
    if (unit === 'cm') {
        return value / 100;
    } else {
        return value;
    }
}

router.post("/plantation", async (req, res) => {
    try {
        const { textplantspace, textRowspace, textPlant, PlantSpaceUnitselectedValue } = req.body;
        const area = 2;

        const plantSpacing = convertToCommonUnit(textplantspace, PlantSpaceUnitselectedValue);
        const rowSpacing = convertToCommonUnit(textRowspace,PlantSpaceUnitselectedValue );
        const numberOfPlants = calculateNumberOfPlants(area, plantSpacing, rowSpacing);
        const calculatedPlantDensity = calculatePlantationDensity(area, plantSpacing, rowSpacing);

        // Log and save data
        console.log("Number of plants:", numberOfPlants);
        console.log("Plantation density:", calculatedPlantDensity);
        console.log("Plant type:", textPlant);

        const newPlantation = new plantationModel({
            PlantType: textPlant,
            PlantSpace: textplantspace,
            RowSpace: textRowspace,
            NoOfPlants: numberOfPlants,
            PlantDensity: calculatedPlantDensity,
            Unit: PlantSpaceUnitselectedValue,
        });

        await newPlantation.save();

        res.json({ status: "ok", data: "Plantation Created" });
    } catch (error) {
        res.status(500).json({ status: "error", data: error.message });
    }
});



router.get("/numberOfPlants", async (req, res) => {
    try {
        const plant = await plantationModel.findOne().sort({ _id: -1 });

        if (!plant) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const numberOfPlants = plant.NoOfPlants;

        res.json({ status: "success", data: numberOfPlants });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get("/plantDensity", async (req, res) => {
    try {
        const plant = await plantationModel.findOne().sort({ _id: -1 });

        if (!plant) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const plantationDensity = plant.PlantDensity;

        res.json({ status: "success", data: plantationDensity });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get("/plantType", async (req, res) => {
    try {
        const plant = await plantationModel.findOne().sort({ _id: -1 });

        if (!plant) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const plantType = plant.PlantType;

        res.json({ status: "success", data: plantType });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


module.exports = router;