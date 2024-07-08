const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");
const MapTemplateSchema = require("../models/MapTemplateModel");

//calculate the effort output function
function calculateEffortOutput(
  weedEffort,
  plantEffort,
  stoneEffort,
) {
  const effortCount = Math.ceil(weedEffort+plantEffort+stoneEffort);
  return effortCount;
}
const calculateWeedEffort = (weedType,area,laborsCount,machineDetails) => {
  let weedEffort = 0;
  let totalWeedEffort = 0;
  const machineEffortValues = { Backhoes: 0.714, Excavators: 0.0593 }; // time in minutes to clear 1 square meter 
  const weedEffortValues = { Low: 0.036, Medium: 0.042, High: 0 };//hours per 1 square meter and per 1 labor.for high assume already one backhoe exists
  if(weedType === "Low" || weedType === "Medium"){
      weedEffort = weedEffortValues[weedType];
      totalWeedEffort = (weedEffort/laborsCount)*area;
    }
  if(weedType === "High"){
    if(machineDetails){
      machineDetails.forEach(({count,type}) => {
        if(type === "Backhoes"){
          weedEffort = machineEffortValues[type] / parseInt(count);
        }
        if(type === "Excavators"){
          weedEffort = machineEffortValues[type] / (parseInt(count));
        }
        if(type !== "Backhoes" && type !== "Excavators"){
          weedEffort = 0.714;
        }
      });
    }
    totalWeedEffort = (weedEffort*area)/60;
  }
  
  
  return totalWeedEffort;
}


const calculatePlantEffort = (plantDetails,machineDetails) => {
  let plantEffort = 0;
  let chainsawCount = 1;
  let totalPlantEffort = 0;
  const plantEffortValues = { Low: 1 / 12, Medium: 0.25, High: 0.5 };//for 1 chainsaw
  if(machineDetails){
    machineDetails.forEach(({count,type}) => {
      if(type === "Chainsaws"){
          chainsawCount = parseInt(count);
      }
  })
  }
  plantDetails.forEach(({ count, type }) => {
    const effortPerPlant = plantEffortValues[type];
    plantEffort += effortPerPlant * parseInt(count);
  });

  totalPlantEffort = plantEffort/chainsawCount;
  return totalPlantEffort;
}

const calculateStoneEffort = (stoneDetails,machineDetails) => {
  let stoneEffort = 0;
  let breakerCount = 1;
  let totalStoneEffort = 0;
  const stoneEffortValues = { Small:0.5 , Large: 1 };
  if(machineDetails){
    machineDetails.forEach(({count,type}) => {
      if(type === "Excavator breakers"){
          breakerCount = parseInt(count);
      }
  })
  }
  stoneDetails.forEach(({ count, type }) => {
    const effortPerStone = stoneEffortValues[type];
    stoneEffort += effortPerStone * parseInt(count);
  });

  totalStoneEffort = stoneEffort/breakerCount;
  return totalStoneEffort;
}

const calculateWorkDays = (effort,workHours) => {
  const fulldays = Math.floor(effort / workHours);
  const remainingHours = effort % workHours;
  const totalDays = remainingHours === 0 ? fulldays : fulldays + 1;
  return totalDays;
}
router.post("/clearLand", async (req, res) => {
  try {
    const {
      id,
      pressed,
      laborCount,
      workHours,
      displayValues,
      displayValues1,
      displayValues2,
    } = req.body;

     // Fetch area from MapTemplateSchema
     const mapData = await MapTemplateSchema.findOne({ _id: id });
     const area = parseInt(mapData.area * 25.2929);
     console.log(area);
    
    const laborsCount = parseInt(laborCount);
    const weedType = pressed;
    const plantDetails = displayValues.map((value) => {
      const [count, type] = value.split(" x ");
      return {count, type: type.trim() };
    });
     
    const stoneDetails = displayValues1.map((value) => {
      const [count, type] = value.split(" x ");
      return {count, type: type.trim() };
    });;
    const machineDetails = displayValues2.map((value) => {
        const [count, type] = value.split(" x ");
        return { count, type: type.trim()};
      });
      const weedEffort = calculateWeedEffort(weedType,area,laborsCount,machineDetails);
    const plantEffort = calculatePlantEffort(plantDetails,machineDetails);  
    const stoneEffort = calculateStoneEffort(stoneDetails,machineDetails);
    const effort = calculateEffortOutput(weedEffort,plantEffort,stoneEffort);
    const workDays = calculateWorkDays(effort,workHours);

    const newclearLand = new clearLandModel({
      Id: id,
      WeedType: pressed,
      PlantDetails: displayValues,
      StoneDetails: displayValues1,
      LaborsCOunt: laborCount,
      WorkHoursCount: workHours,
      MachineDetails: displayValues2,
      WeedEffort: weedEffort,
      PlantEffort: plantEffort,
      StoneEffort: stoneEffort,
      EffortOutput: effort,
      WorkDays : workDays,
    });

    await newclearLand.save();

    res.send({ status: "ok", data: "Clear Land Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

//for clearLand manual calculator
router.post("/clearLandFromManualCalculator", async (req, res) => {
  try {
    const{
      pressed,
      laborCount,
      workHours,
      displayValues,
      displayValues1,
      displayValues2,
      area,
    } = req.body

    const laborsCount = parseInt(laborCount);
    const weedType = pressed;
    const plantDetails = displayValues.map((value) => {
      const [count, type] = value.split(" x ");
      return {count, type: type.trim() };
    });
     
    const stoneType = displayValues1;
    const machineDetails = displayValues2.map((value) => {
        const [type, count] = value.split(" x ");
        return { type: type.trim(), count};
      });
    const weedEffort = calculateWeedEffort(weedType);
    const plantEffort = calculatePlantEffort(plantDetails);  
    const stoneEffort = calculateStoneEffort(stoneType);
    const machineEffort = calculateMachineEffort(machineDetails);
    const chainsawCount = getChainsawCount(machineDetails);
    const breakerCount = getBreakerCount(machineDetails);
    const effort = calculateEffortOutput(area,weedEffort,laborsCount,plantEffort,stoneEffort,machineEffort,chainsawCount,breakerCount);
    const workDays = calculateWorkDays(effort,workHours);

    res.json({
      status: "ok",
      data: {
        effort,
         workDays,
      },
    })

  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

//send data to the frontend page -API
router.get("/effortOutput/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ClearLand = await clearLandModel.findOne({ Id: id });
    const map = await MapTemplateSchema.findOne({ _id: id });
    if (!ClearLand && !map) {
      return res
        .status(404)
        .json({ status: "error", message: "No recently updated data found" });
    }
    const effortOutput = ClearLand.EffortOutput;
    const weedEffort = ClearLand.WeedEffort;
    const plantEffort = ClearLand.PlantEffort;
    const stoneEffort = ClearLand.StoneEffort;
    const workDays = ClearLand.WorkDays;
    const weedsType = ClearLand.WeedType;
    const workHours = ClearLand.WorkHoursCount;
    const laborCount = ClearLand.LaborsCOunt;
    const plantDetails = ClearLand.PlantDetails;
    const stoneDetails = ClearLand.StoneDetails;
    const machineDetails = ClearLand.MachineDetails;
    const Area = map.area;
    const Perimeter = map.perimeter;

    res.json({
      status: "success",
      effortOutput,
      weedEffort,
      plantEffort,
      stoneEffort,
      workDays,
      weedsType,
      workHours,
      laborCount,
      plantDetails,
      stoneDetails,
      machineDetails,
      Area,
      Perimeter,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get clear land data" });
  }
});

//check id exists or not in the database - API

router.get("/check-id/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await clearLandModel.findOne({ Id: id });
    if (item) {
      res.status(200).json({ exists: true });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid ID format" });
  }
});

//delete data from the database - API

router.delete("/deleteClearLand/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteClearLand = await clearLandModel.findOneAndDelete({ Id: id });
    if (!deleteClearLand) {
      return res.status(404).send("Clear land not found");
    }
    res.send("Clear land deleted successfully");
  } catch (error) {
    res.status(500).send("Error while deleting clear land");
  }
});

module.exports = router;
