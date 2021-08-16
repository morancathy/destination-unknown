const Destination = require('../models/destination.js');
const Comment = require('../models/comment');
const router = require('express').Router();

//Create
router.post('/', async(req, res) => {
  try {
    const createdDestination = await Destination.create(req.body)
    res.status(200).json(createdDestination)
  } catch(error){
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

//Read (Index /Root Route)
router.get('/', async(req, res) => {
  try {
    const foundDestinations = await Destination.find({})
    res.status(200).json(foundDestinations)
  } catch(error){
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

//Read (Show)
router.get('/:id', async (req, res) => {
  try {
    const foundDestination = await Destination.findById(req.params.id)
    res.status(200).json(foundDestination)
  } catch(error) {
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

//Update (Update)
router.put('/:id', async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedDestination)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

//Update (Add Destination)
router.put('/:id/addComment', async (req, res) => {
  const createCommentQuery = Comment.create(req.body)

  createCommentQuery.exec((err, createdComment) => {
    const updateDestinationQuery = Destination.findByIdAndUpdate(req.params.id, { $addToSet: { destinations: createdDestination._id }}, { new: true })

    updateDestinationQuery.exec((err, updatedDestination) => {
      if(err){
        console.error(error)
        res.status(400).json({message: error.message})
      } else {
        res.status(200).json(ccreatedComment)
      }
    })
  })
});

//Delete
router.delete('/:id', async (req, res) => {
  try {
    const deletedDestination = await Destination.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedDestination)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});



module.exports = router;
