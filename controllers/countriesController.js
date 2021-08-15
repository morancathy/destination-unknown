const Country = require('../models/country.js');
const Destination = require('../models/destination.js');
const router = require('express').Router();

//Create
router.post('/', async(req, res) => {
  try {
    const createdCountry = await Country.create(req.body)
    res.status(200).json(createdCountry)
  } catch(error){
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

//Read (Index /Root Route)
router.get('/', async(req, res) => {
  try {
    const foundCountries = await Country.find({})
    res.status(200).json(foundCountries)
  } catch(error){
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

//Read (Show)
router.get('/:id', async (req, res) => {
  try {
    const foundCountry = await Country.findById(req.params.id)
    res.status(200).json(foundCountry)
  } catch(error) {
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

//Update (Update)
router.put('/:id', async (req, res) => {
  try {
    const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedCountry)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

//Update (Add Destination)


//Delete



module.exports = router;
