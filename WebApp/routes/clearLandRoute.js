const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");

router.post("/clearLand", async (req, res) => {
    const { pressed, plantTypeSelectedValue, plantCount, stoneTypeSelectedValue, stonesCount,laborCount,workHours,searchItem,machineCount,displayValues } = req.body;
    
    try{

        const newclearLand = new clearLandModel({
            WeedType: pressed,
            PlantDetails:displayValues,
            // PlantType: plantTypeSelectedValue,
            // PlantCount: plantCount,
            StonesType: stoneTypeSelectedValue,
            StonesCount: stonesCount,
            LaborsCOunt: laborCount,
            WorkHoursCount: workHours,
            Machinetype: searchItem,
            MachineCount: machineCount
    
        })
      
        await newclearLand.save();

        res.send({status:"ok" , data: "Clear Land Created"});
        
    }
    catch(error){
        res.send({status:"error" , data: error});
    }
    
})


module.exports = router;