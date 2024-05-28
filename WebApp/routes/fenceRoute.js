const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");

function calculateNumberOfSticks (perimeter,gapBetweenSticks,gapUnit,totalGateLengths,gateCount) {
  const convertedGap = convertToCommonUnit(gapBetweenSticks, gapUnit);
  const remainingPerimeter = perimeter - totalGateLengths;
  let numberOfSticks = Math.ceil(remainingPerimeter / convertedGap);
  if(gateCount>0){
    numberOfSticks -= gateCount;
    numberOfSticks += 2;
  }
  return numberOfSticks;
}

function convertToCommonUnit(value, unit) {
  if (unit === "cm") {
    return value / 100;
  } else {
    return value;
  }
}

const calculateTotalGateLengths = (numberOfGates, gateLengths) => {
  let totalLength = 0;
  for (let i = 0; i < numberOfGates.length; i++) {
    totalLength += numberOfGates[i] * gateLengths[i];
  }
  return totalLength;
};

function calculateSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += parseInt(array[i]);
  }
  return sum;
}

router.post("/fence", async (req, res) => {
  try {
    const {
      id,
      FenceTypeselectedValue,
      inputValuePostspace,
      PostSpaceUnitselectedValue,
      displayValues,
      fenceAmountsArray,
      fenceLengthsArray,
      Perimeter,
    } = req.body;

    const perimeter = Perimeter*1000;
    const gapBetweenSticks = inputValuePostspace;
    const gapUnit = PostSpaceUnitselectedValue;
    const gateLength = fenceLengthsArray;
    const numberOfGates = fenceAmountsArray;
    const gateCount = calculateSum(numberOfGates);

    const totalGateLengths = calculateTotalGateLengths(numberOfGates,gateLength);
    const numberOfSticks = calculateNumberOfSticks(perimeter,gapBetweenSticks,gapUnit,totalGateLengths,gateCount);

    const newFence = new fenceModel({
      Id:id,
      FenceType: FenceTypeselectedValue,
      PostSpace: inputValuePostspace,
      PostSpaceUnit: PostSpaceUnitselectedValue,
      Gatelength: fenceLengthsArray,
      NumberofGates: fenceAmountsArray,
      NumberofSticks: numberOfSticks,
      GateDetails: displayValues,
    });

    await newFence.save();

    res.json({
      status: "ok",
      data: "Fence Created",
      totalGateLengths,
      gateCount,
      numberOfSticks,
    });
  } catch (error) {
    res.status(500).json({ status: "error", data: error.message });
  }
});

router.get("/numberOfSticks", async (req, res) => {
  try {
    const recentFence = await fenceModel.findOne().sort({ _id: -1 });

    if (!recentFence) {
      return res.status(404).json({ status: "error", message: "No recently updated data found" });
    }
    const numberOfSticks = recentFence.NumberofSticks;
    res.json({ status: "success", data: numberOfSticks });
    
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;