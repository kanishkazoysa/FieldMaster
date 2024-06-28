const express = require("express");
const router = express.Router();
const plantationModel = require("../models/plantation");
const MapTemplateModel = require("../models/MapTemplateModel");

function calculateNumberOfPlants(area, plantSpacing, rowSpacing) {
    const areaInSquareMeters = parseFloat(area) * 25.29;
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
        const { textplantspace, textRowspace, textPlant, PlantSpaceUnitselectedValue,id , area } = req.body;
        

        const plantSpacing = convertToCommonUnit(textplantspace, PlantSpaceUnitselectedValue);
        const rowSpacing = convertToCommonUnit(textRowspace,PlantSpaceUnitselectedValue );
        const numberOfPlants = calculateNumberOfPlants(area, plantSpacing, rowSpacing);
        const calculatedPlantDensity = calculatePlantationDensity(area, plantSpacing, rowSpacing);

        // Log and save data
        console.log("Number of plants:", numberOfPlants);
        console.log("Plantation density:", calculatedPlantDensity);
        console.log("Plant type:", textPlant);

        const newPlantation = new plantationModel({
            Id:id,
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

router.post("/plantationFromManualCalculator", async (req, res) => {
    try {
      const { textplantspace, textRowspace, textPlant, PlantSpaceUnitselectedValue, area } = req.body;
      const plantSpacing = convertToCommonUnit(textplantspace, PlantSpaceUnitselectedValue);
      const rowSpacing = convertToCommonUnit(textRowspace, PlantSpaceUnitselectedValue);
      const numberOfPlants = calculateNumberOfPlants(area, plantSpacing, rowSpacing);
      const calculatedPlantDensity = calculatePlantationDensity(area, plantSpacing, rowSpacing);
  
      // Log and send data
      console.log("Number of plants:", numberOfPlants);
      console.log("Plantation density:", calculatedPlantDensity);
      console.log("Plant type:", textPlant);
  
      res.json({
        status: "ok",
        data: {
          numberOfPlants,
          calculatedPlantDensity,
          textPlant
        }
        
      });
    } catch (error) {
      res.status(500).json({ status: "error", data: error.message });
    }
  });

router.get("/numberOfPlants/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const plant = await plantationModel.findOne({ Id: id });
        const map = await MapTemplateModel.findOne({ _id: id });

        if (!plant && !map) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const numberOfPlants = plant.NoOfPlants;
        const PlnatType = plant.PlantType;
        const plantspace = plant.PlantSpace;
        const rowSpace = plant.RowSpace;
        const PlantDensity = plant.PlantDensity;
        const Unit = plant.Unit;
        const area = map.area;
        const perimeter = map.perimeter;

        res.json({ status: "success",numberOfPlants, PlnatType, plantspace, rowSpace, PlantDensity, Unit, area, perimeter });
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


router.get("/check-id/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const item = await plantationModel.findOne({ Id: id });
      if (item) {
        res.status(200).json({ exists: true });
      } else {
        res.status(404).json({ exists: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Invalid ID format' });
    }
  });

router.delete("/deletePlantation/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const deletedPlantation = await plantationModel.findOneAndDelete({ Id: id });
      if (!deletedPlantation) {
        return res.status(404).send('Fence not found.');
      }
      res.send('Fence deleted successfully.');
    } catch (error) {
      res.status(500).send('Error while deleting fence.');
    }
});
  
router.get("/plantDensityFromManualCalculator", async (req, res) => {
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
router.get("/numberOfPlantsFromManualCalculator", async (req, res) => {
    
    try {
        const plant = await plantationModel.findOne().sort({ _id: -1 });
        if (!plant ) {
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }

        const numberOfPlants = plant.NoOfPlants;
        

        res.json({ status: "success", data: numberOfPlants });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

router.get("/plantTypeFromManualCalculator", async (req, res) => {
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