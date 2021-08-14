const {Schema, model} = require('mongoose');

const destinationSchema = new Schema({
  title:        {type: String, required: true, unique: true},
  description:  {type: String, required: true},
  city:         {type: String, required: true},
  howToGetThere:{type: String},
  img:          {type: String}
}, {
  timestamps: true
});

module.exports = model('Destination', destinationSchema);
