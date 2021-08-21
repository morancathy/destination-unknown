const User = require('../models/user');
const registerRouter = require('express').Router();
// const {hash, register, login} = require('./auth')

// registerRouter.post('/login', login)

// Ceate
// registerRouter.post('/', async (req, res) => {
//   try {
//     const createdRegisterdUser = await User.create(req.body)
//     res.status(200).json(createdRegisterdUser)
//   } catch(error) {
//     console.error(error)
//     res.status(400).json({message: error.message})
//   }
// })

// Read (Index)
registerRouter.get('/', async (req, res) => {
  try {
    const foundRegistedUsers = await User.find({})
    res.status(200).json(foundRegistedUsers)
  } catch(error) {
    console.error(error)
    res.status(404).json({message: error.message})
  }
});

// Read (Show)
registerRouter.get('/:id', async (req, res) => {
  try {
    const foundRegistedUser = await User.findById(req.params.id)
    res.status(200).json(foundRegistedUser)
  } catch(error) {
    console.error(error)
  res.status(400).json({message: error.message})
  }
});

// Update
registerRouter.put('/:id', async (req, res) => {
  try{
    const updatedRegisteredUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedRegisteredUser)
  } catch(error){
    console.error(error)
    res.status(400).json({message: error.message})
  }
});

// Delete
registerRouter.delete('/:id', async(req, res) => {
  try {
    const deletedRegisteredUser = await User.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedRegisteredUser)
  } catch (error) {
    console.error(error)
    res.status(400).json({
      message: error.message
    })
  }
});

module.exports = registerRouter;
