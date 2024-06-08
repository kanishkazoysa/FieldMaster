const express = require("express");
const router = express.Router();
const clearLandModel = require("../models/clearLand");
const MapTemplateSchema = require("../models/MapTemplateModel");

router.post("/clearLand", async (req, res) => {
    const {id,pressed, plantTypeSelectedValue, plantCount, stoneTypeSelectedValue, stonesCount,laborCount,workHours,searchItem,machineCount,displayValues,displayValues1,displayValues2 } = req.body;
    
    try{

        const newclearLand = new clearLandModel({
            Id: id,
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


//send data to the frontend page -API
router.get("/effortOutput/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const ClearLand = await clearLandModel.findOne({ Id: id });
        const map = await MapTemplateSchema.findOne({ Id: id});
        if(!ClearLand && !map){
            return res.status(404).json({ status: "error", message: "No recently updated data found" });
        }
        const weedsType = ClearLand.WeedType;
        const workHours = ClearLand.WorkHoursCount;
        const laborCount = ClearLand.LaborsCOunt;
        const plantDetails = ClearLand.PlantDetails;
        const stoneDetails = ClearLand.StoneDetails;
        const machineDetails = ClearLand.MachineDetails;
        const Area = map.area;
        const Perimeter = map.perimeter;

        res.json({ status: "success", weedsType,workHours,laborCount,plantDetails,stoneDetails,machineDetails,Area,Perimeter});
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
        res.status(500).json({ error: 'Invalid ID format' });
    }
});

//delete data from the database - API

router.delete("/deleteClearLand/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deleteClearLand = await clearLandModel.findOneAndDelete({ Id: id });
        if (!deleteClearLand) {
            return res.status(404).send('Clear land not found')
        }
        res.send('Clear land deleted successfully');
    } catch (error) {
        res.status(500).send('Error while deleting clear land');
    }
});

module.exports = router;



