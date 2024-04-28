const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");
router.post("/clearLand", async (req, res) => {
    const { pressed, plantTypeSelectedValue, plantCount, stoneTypeSelectedValue, stonesCount,laborCount,workHours,searchItem,machineCount,displayValues,displayValues1,displayValues2 } = req.body;
    
    try{

        const newclearLand = new clearLandModel({
            WeedType: pressed,
            // PlantType: plantTypeSelectedValue,
            // PlantCount: plantCount,
            PlantDetails: displayValues,
            StoneDetails: displayValues1,
            // StonesType: stoneTypeSelectedValue,
            // StonesCount: stonesCount,
            LaborsCOunt: laborCount,
            WorkHoursCount: workHours,
            // Machinetype: searchItem,
            // MachineCount: machineCount,
            MachineDetails: displayValues2
    
        })
      
        await newclearLand.save();

        res.send({status:"ok" , data: "Clear Land Created"});
        
    }
    catch(error){
        res.send({status:"error" , data: error});
    }
    
})
module.exports = router;
//get data
router.get("/latestClearLand", async (req, res) => {
    try {
        const latestClearLand = await clearLandModel.findOne().sort({ _id: -1 });
        res.status(200).json(latestClearLand);
    } catch (error) {
        res.status(500).json({ error: "Failed to get latest clear land data" });
    }
});



