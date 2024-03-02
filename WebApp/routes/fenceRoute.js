const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");


router.post("/fence", async (req, res) => {
    const { FenceType, PostSpace, PostSpaceUnit, Gatelength, NumberofGates } = req.body;

    try {
        
    }
})


module.exports = router;
