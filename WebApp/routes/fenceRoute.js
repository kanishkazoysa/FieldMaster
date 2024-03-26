const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");

function calculateNumberOfSticks(perimeter, gapBetweenSticks, gateLength, numberOfGates) {
    const remainingPerimeter = perimeter - (gateLength * numberOfGates);
    let numberOfSticks = Math.ceil(remainingPerimeter / gapBetweenSticks);
    numberOfSticks -= numberOfGates;
    numberOfSticks += 2;
    return numberOfSticks;
}

router.post("/fence", async (req, res) => {
    try {
        const { FenceTypeselectedValue, inputValuePostspace, PostSpaceUnitselectedValue, inputValueFenceLength, inputValueFenceAmount } = req.body;

        const perimeter = 1500; 

        const gapBetweenSticks = inputValuePostspace;

        const gateLength = inputValueFenceLength;
        
        const numberOfGates = inputValueFenceAmount;

        const numberOfSticks = calculateNumberOfSticks(perimeter, gapBetweenSticks, gateLength, numberOfGates);

        const newFence = new fenceModel({
            FenceType: FenceTypeselectedValue,
            PostSpace: inputValuePostspace,
            PostSpaceUnit: PostSpaceUnitselectedValue,
            Gatelength: inputValueFenceLength,
            NumberofGates: inputValueFenceAmount,
            NumberofSticks: numberOfSticks 
        });

        await newFence.save();

        res.json({ status: "ok", data: "Fence Created", numberOfSticks });
    } catch (error) {
        res.status(500).json({ status: "error", data: error.message });
    }
});


router.get("/numberOfSticks", async (req, res) => {
    try {
        const fences = await fenceModel.find();

        const numberOfSticks = fences.map(fence => fence.NumberofSticks);

        res.json({ status: "success", data: numberOfSticks });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});






module.exports = router;
