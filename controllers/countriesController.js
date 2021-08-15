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


//Read (Show)


//Update (Update)


//Update (Add Destination)


//Delete



module.exports = router;
