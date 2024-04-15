

const express = require('express');
const router = express.Router();
const PolylineData = require('../models/mapData');

// Route to save polyline data to the database
router.post('/save', async (req, res) => {
  try {
    const { coordinates ,area } = req.body; // Extract polyline coordinates from request body
console.log(req.userId);
    // Create a new PolylineData document
    const newPolylineData = new PolylineData({
      coordinates,
      area,
      userId: req.userId,
    });

    // Save the document to the database
   const data = await newPolylineData.save();
res.json(data);
    // res.status(201).json({ message: 'Polyline data saved successfully' });
  } catch (error) {
    console.error('Error saving polyline data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
