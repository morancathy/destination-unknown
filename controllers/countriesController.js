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


//Update (Update)


//Update (Add Destination)


//Delete



module.exports = router;
