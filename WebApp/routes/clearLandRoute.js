const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");
const MapTemplateSchema = require("../models/MapTemplateModel");

//calculate the effort output function
function calculateEffortOutput(
  weedEffort,
  laborsCount,
  plantEffort,
  stoneEffort,
  machineEffort,
  chainsawCount,
  breakerCount
) {

  let area = 1000
  //efficiencies for each type
  // const weedEffortValues = { Low: 2, Medium: 4, High: 0 };
  // const plantEffortValues = { Low: 1 / 12, Medium: 0.25, High: 0.5 };
  // const stoneEffortValues = { High: 1 };
  // const machineEfficiencies = { Backhoes: 0.714, Excavators: 0.0593 }; //efficiency in minutes
  
//calculate total effort
  const effortCount = Math.ceil((weedEffort*laborsCount*area) + (plantEffort/chainsawCount) + (stoneEffort/breakerCount) + ((machineEffort*area)/60));
  return effortCount;
}
const calculateWeedEffort = (weedType) => {
  let weedEffort = 0;
  const weedEffortValues = { Low: 2, Medium: 4, High: 0 };//hours per 1 square meter and per 1 labor
  if(weedType){
      weedEffort = weedEffortValues[weedType];
    }
  return weedEffort;
}

const calculatePlantEffort = (plantDetails) => {
  let plantEffort = 0;
  const plantEffortValues = { Low: 1 / 12, Medium: 0.25, High: 0.5 };//for 1 chainsaw
  plantDetails.forEach(({ count, type }) => {
    const effortPerPlant = plantEffortValues[type];
    plantEffort += effortPerPlant * parseInt(count);
  });
  return plantEffort;
}

const calculateStoneEffort = (stoneType) => {
  let stoneEffort = 0;
  const stoneEffortValues = { Small:0 , Medium:0 ,High: 1 };
  if(stoneType){
    stoneType.forEach((type) => {
      stoneEffort += stoneEffortValues[type];
    });
  }
  return stoneEffort;
}

const calculateMachineEffort = (machineDetails) => {
  let machineEffort = 0;
  const machineEffortValues = { Backhoes: 0.714, Excavators: 0.0593 }; //effort in minutes to clear a 1 square meter land
  if(machineDetails){
      machineDetails.forEach(({type,count}) => {
          if(type === "Backhoes"){
              backhoeEffort = machineEffortValues[type] / parseInt(count);
          }
          if(type === "Excavators"){
              excavatorEffort = machineEffortValues[type] / parseInt(count);
          }
      })
      machineEffort = backhoeEffort + excavatorEffort;
    }
  return machineEffort;
}

const getChainsawCount = (machineDetails) => {
  let chainsawCount= 1;
  if(machineDetails){
    machineDetails.forEach(({type,count}) => {
      if(type === "Chainsaw"){
          chainsawCount = 0 + parseInt(count);
      }
  })
  }
  return chainsawCount;
}

const getBreakerCount = (machineDetails) => {
  let breakerCount= 1;
  if(machineDetails){
    machineDetails.forEach(({type,count}) => {
      if(type === "Chainsaw breakers"){
          breakerCount = 0 + parseInt(count);
      }
  })
  }
  return breakerCount;
}
router.post("/clearLand", async (req, res) => {
  try {
    const {
      id,
      pressed,
      laborCount,
      workHours,
      machineTypeArray,
      machineCountArray,
      displayValues,
      displayValues1,
      displayValues2,
    } = req.body;

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
      console.log(machineDetails);
    const weedEffort = calculateWeedEffort(weedType);
    const plantEffort = calculatePlantEffort(plantDetails);  
    const stoneEffort = calculateStoneEffort(stoneType);
    const machineEffort = calculateMachineEffort(machineDetails);
    const chainsawCount = getChainsawCount(machineDetails);
    const breakerCount = getBreakerCount(machineDetails);
    const effort = calculateEffortOutput(weedEffort,laborsCount,plantEffort,stoneEffort,machineEffort,chainsawCount,breakerCount);

    const newclearLand = new clearLandModel({
      Id: id,
      WeedType: pressed,
      PlantDetails: displayValues,
      StoneDetails: displayValues1,
      LaborsCOunt: laborCount,
      WorkHoursCount: workHours,
      Machinetype: machineTypeArray,
      MachineCount: machineCountArray,
      MachineDetails: displayValues2,
      EffortOutput: effort,
    });

    await newclearLand.save();

    res.send({ status: "ok", data: "Clear Land Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

//send data to the frontend page -API
router.get("/effortOutput/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const ClearLand = await clearLandModel.findOne({ Id: id });
    const map = await MapTemplateSchema.findOne({ Id: id });
    if (!ClearLand && !map) {
      return res
        .status(404)
        .json({ status: "error", message: "No recently updated data found" });
    }
    const effortOutput = ClearLand.EffortOutput;
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
