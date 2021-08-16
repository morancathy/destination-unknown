const {Schema, model} = require('mongoose');

const destinationSchema = new Schema({
  title:        {type: String, required: true, unique: true},
  country:      {type: String, required: true},
  city:         {type: String, required: true},
  description:  {type: String, required: true},
  howToGetThere:{type: String},
  img:          {type: String},
  name:         {type: String, required: true},
  comments:     [ {type: Schema.Types.ObjectId, ref: 'Comment'} ]
}, {
  timestamps: true
});

module.exports = model('Destination', destinationSchema);
