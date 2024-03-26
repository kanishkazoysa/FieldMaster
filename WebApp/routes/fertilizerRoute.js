const express = require("express");
const router = express.Router();
const fertilizerModel = require("../models/fertilizer");


// Function to calculate the total amount of fertilizer needed for one year
const calculateFertilizerAmountForYear = (frequency, NoOfTimes, AmountOfOneTime, unit) => {
    let factor = 1;

    // Determine the factor based on the frequency
    switch (frequency.toLowerCase()) {
        case "daily":
            factor = 365;
            break;
        case "weekly":
            factor = 4; // Weekly amount for one month
            break;
        case "monthly":
            factor = 12;
            break;
        case "quarterly":
            factor = 4;
            break;
        case "yearly":
            factor = 1;
            break;
        default:
            factor = 1;
    }

    // Calculate the total amount for one year
    const totalAmount = factor * NoOfTimes * AmountOfOneTime;

    // Convert the amount to kilograms if the unit is grams
    if (unit.toLowerCase() === "g") {
        return totalAmount / 1000; // Convert grams to kilograms
    } else {
        return totalAmount; // Return the total amount directly if the unit is kilograms
    }
};


router.post("/fertilizer", async (req, res) => {
    
    try{
        const { textFertilizationType,textFertilizationNUmberoftime,textFertilizationAmount,FertilizerAmountUnitselectedValue} = req.body;
        const area = 100; // Acres

        const frequency="weekly";
        const NoOfTimes = textFertilizationNUmberoftime;
        const AmountOfOneTime = textFertilizationAmount;
        const unit = FertilizerAmountUnitselectedValue;
        
        const totalAmount = calculateFertilizerAmountForYear(frequency, NoOfTimes, AmountOfOneTime, unit);
        
        console.log("Total amount:", totalAmount);
        res.json({status:"ok" , data: "Counted the amount of fertilizer"});

        const newFertilizer = new fertilizerModel({
            AmountOfOneTime: textFertilizationAmount,
            NoOfTimes: textFertilizationNUmberoftime,
            FertilizerType: textFertilizationType,
            unit:FertilizerAmountUnitselectedValue,
            FertilizerAmountNeeded:totalAmount
        })
      
        await newFertilizer.save();
        
        res.json({status:"ok" , data: "Fertilizer Created"});
    }
    catch(error){
        res.status(500).json({status:"error" , data: error.message});
    }
    
})


module.exports = router;