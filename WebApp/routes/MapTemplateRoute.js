const express = require('express');
const cors = require('cors');
const router = express.Router();
const MapTemplateModel = require('../Models/MapTemplateModel');
const turf = require('@turf/turf');

router.use(cors());

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/saveTemplate', async (req, res) => {
  try {
    /* const { locationPoints } = req.body;
    const area = calculateArea(locationPoints);
    req.body.area = area; */

    const mapTemplate = new MapTemplateModel(req.body);
    await mapTemplate.save();
    res.send('Map saved successfully.');
  } catch (error) {
    res.status(500).send(error);
  }
});
router.get('/getAllTemplates', async (req, res) => {
  try {
    const templates = await MapTemplateModel.find();
    res.json(templates);
  } catch (error) {
    res.status(500).send('Error while getting templates.');
  }
});

router.get('/getOneTemplate/:id', async (req, res) => {
  try {
    const template = await MapTemplateModel.findById(req.params.id);
    res.json(template);
  } catch (error) {
    res.status(500).send('Error while getting template.');
  }
});
const calculateArea = (locationPoints) => {
  const coordinates = locationPoints.map((point) => [
    point.longitude,
    point.latitude,
  ]);
  coordinates.push(coordinates[0]);

  const polygon = turf.polygon([coordinates]);
  const areaInSquareMeters = turf.area(polygon);

  const areaInPerches = parseFloat((areaInSquareMeters * 0.0395369).toFixed(4));
  return areaInPerches;
};
router.put('/updateTemplate/:id', async (req, res) => {
  try {
    /* const { locationPoints } = req.body;
    const area = calculateArea(locationPoints);
    req.body.area = area; */

    const updatedTemplate = await MapTemplateModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updatedTemplate);
  } catch (error) {
    res.status(500).send('Error while updating map.');
  }
});

router.delete('/deleteTemplate/:id', async (req, res) => {
  try {
    await MapTemplateModel.findByIdAndDelete(req.params.id);
    res.send('Map deleted successfully.');
  } catch (error) {
    res.status(500).send('Error while deleting map.');
  }
});

module.exports = router;
