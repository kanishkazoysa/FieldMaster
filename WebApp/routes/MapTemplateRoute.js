const express = require('express');
const cors = require('cors');
const router = express.Router();
const MapTemplateModel = require('../models/MapTemplateModel');

router.use(cors());

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/saveTemplate', async (req, res) => {
  try {
    const mapTemplate = new MapTemplateModel(req.body);
    await mapTemplate.save();
    res.send('Map saved successfully.');
  } catch (error) {
    res.status(500).send('Error while saving map.');
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

router.put('/updateTemplate/:id', async (req, res) => {
  try {
    await MapTemplateModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Map updated successfully.');
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
