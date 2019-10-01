const mongoose = require('mongoose');
const { RequiredString } = require('./required-types');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const tourSchema = new Schema({
  title: RequiredString, 
  activities: [{ 
    type: String 
  }],
  launchDate: { 
    type: Date,
    default: () => new Date() 
  },
  stops: [{
    type: ObjectId,
    ref: 'Stops'
  }]
});

module.exports = mongoose.model('Tours', tourSchema);