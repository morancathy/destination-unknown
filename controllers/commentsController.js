const Destination = require('../models/destination.js');
const Comment = require('../models/comment');
const router = require('express').Router();

// Create route is in destinationsController

// /Read (Index)
router.get('/', async(req, res) => {
  try {
    const foundComments = await Comment.find({})
    res.status(200).json(foundComments)
  } catch(error){
    console.error(error)
    res.status(400).json({message:error.message})
  }
});
// /Read (Show)
router.get('/:id', async(req, res) => {
  try {
    const foundComment = await Comment.findById(req.params.id)
    res.status(200).json(foundComment)
  } catch(error){
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

// Update (updates comment in comment model)
router.put('/:id', async (req, res) => {
  try {
    const updatedComment =
      await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedComment)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});
// //Update (updates destination)
router.put('/:id', async (req, res) => {
  try {
    const updatedComment =
      await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedComment)
  } catch(error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

// Delete (deletes comment in comment model)
router.delete('/:id', async(req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedComment)
  } catch(error){
    console.error(error)
    res.status(400).json({message:error.message})
  }
});

module.exports = router;
