const {Schema, model} = require('mongoose');

const countrySchema = new Schema({
  country:    {type: String, required: true},
  suggestions: [{ type: Schema.Types.ObjectId, ref: 'Destination'}]
}, {
  timestamps: true
});

module.exports = model('Country', countrySchema)
