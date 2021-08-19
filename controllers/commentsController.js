// // const Destination = require('../models/destination.js');
// const Comment = require('../models/comment');
// const router = require('express').Router();
//
// //Read (Index /Root Route)
// router.get('/', async(req, res) => {
//   try {
//     const foundComments = await Comment.find({})
//     res.status(200).json(foundComments)
//   } catch(error){
//     console.error(error)
//     res.status(400).json({message:error.message})
//   }
// });
//
// // Read (Show)
// router.get('/:id', async (req, res) => {
//   try {
//     const foundComment = await Comment.findById(req.params.id)
//     res.status(200).json(foundComment)
//   } catch(error) {
//     console.error(error)
//     res.status(400).json({message: error.message})
//   }
// });
//
// module.exports = router;
