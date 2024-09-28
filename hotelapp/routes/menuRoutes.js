const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');

//Post Method to add a menuItem

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//Get Method to get the menu Item
router.get('/', async (req, res) => {
  try {
    const menu = await MenuItem.find();
    console.log('Data Fetched');
    res.status(200).json(menu);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste;// Extract the taste type from the URL parameter
    if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
      const menu = await MenuItem.find({ taste: taste });
      console.log('data fetched successfully');
      res.status(200).json(menu);
    } else {
      res.status(404).json({ error: 'Invalid taste type' });
    }
  } catch (error) {
    console.log("Error fetching persons ", error);
    res.status(500).json({ error: 'Internal server error' })
  } 
});

module.exports = router;
