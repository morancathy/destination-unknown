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
router.put('/:id/addDestination', async (req, res) => {
  const createDestinationQuery = Destination.create(req.body)

  createDestinationQuery.exec((err, createdDestination) => {
    const updateCountryQuery = Country.findByIdAndUpdate(req.params.id, { $addToSet: { destinations: createdDestination._id }}, { new: true })

    updateCountryQuery.exec((err, updatedCountry) => {
      if(err){
        console.error(error)
        res.status(400).json({message: error.message})
      } else {
        res.status(200).json(createdDestination)
      }
    })
  })
});

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedCountry = await Country.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedCountry)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});



module.exports = router;
