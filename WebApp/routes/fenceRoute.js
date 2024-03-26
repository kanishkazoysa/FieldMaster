const express = require("express");
const router = express.Router();
const fenceModel = require("../models/fence");


router.post("/fence", async (req, res) => {
    const { FenceTypeselectedValue, inputValuePostspace, PostSpaceUnitselectedValue, inputValueFenceLength, inputValueFenceAmount } = req.body;
    
    try{

        const newfence = new fenceModel({
            FenceType : FenceTypeselectedValue,
            PostSpace : inputValuePostspace,
            PostSpaceUnit : PostSpaceUnitselectedValue,
            Gatelength : inputValueFenceLength,
            NumberofGates : inputValueFenceAmount
    
        })
      
        await newfence.save();

        res.send({status:"ok" , data: "Fence Created"});
    }
    catch(error){
        res.send({status:"error" , data: error});
    }
    
})


module.exports = router;