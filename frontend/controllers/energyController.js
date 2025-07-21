const Energy = require('../models/Energy');

const createEntry = async (req, res) => {
  try {
    const newEntry = new Energy(req.body);
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating entry', error: err.message });
  }
};

const getAllEntries = async (req, res) => {
  try {
    const data = await Energy.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data', error: err.message });
  }
};

module.exports = { createEntry, getAllEntries };
