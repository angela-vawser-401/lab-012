const mongoose = require('mongoose');
const { RequiredString } = require('./required-types');
const { Schema } = mongoose;

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
    location: {
      latitude: Number,
      longitude: Number
    },
    weather: {
      time: Date,
      forecast: String
    },
    attendance: {
      type: Number,
      min: 1
    }
  }]
});

module.exports = mongoose.model('Tour', tourSchema);