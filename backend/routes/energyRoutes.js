const express = require('express');
const router = express.Router();
const Energy = require('../models/Energy');

// POST - Add new energy entry
router.post('/', async (req, res) => {
  try {
    const { device, usage } = req.body;
    const newEntry = new Energy({ device, usage });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("❌ Error saving entry:", err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET - All energy entries
router.get('/', async (req, res) => {
  try {
    const entries = await Energy.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

