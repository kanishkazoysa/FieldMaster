const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");

router.post("/clearLand", async (req, res) => {
    const { pressed, plantTypeSelectedValue, plantCount, stoneTypeSelectedValue, stonesCount,laborCount,workHours,searchItem,machineCount } = req.body;
    
    try{

        const newclearLand = new clearLandModel({
            WeedType: pressed,
            PlantType: plantTypeSelectedValue,
            PlantCount: plantCount,
            StonesType: stoneTypeSelectedValue,
            StonesCount: stonesCount,
            LaborsCOunt: laborCount,
            WorkHoursCount: workHours,
            Machinetype: searchItem,
            MachineCount: machineCount
    
        })
      
        await newclearLand.save();

        res.json({status:"ok" , data: "Clear Land Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error});
    }
    
})


module.exports = router;