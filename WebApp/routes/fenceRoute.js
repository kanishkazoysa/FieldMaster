const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");


router.post("/fence", async (req, res) => {
    const { FenceType, PostSpace, PostSpaceUnit, Gatelength, NumberofGates } = req.body;
    
    const newfence = new fenceModel({
        FenceType : FenceTypeselectedValue,
        PostSpace : inputValuePostspace,
        PostSpaceUnit : PostSpaceUnitselectedValue,
        Gatelength : inputValueFenceLength,
        NumberofGates : inputValueFenceAmount

    })
  
    await newfence.save();
})


module.exports = router;