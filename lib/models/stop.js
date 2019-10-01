const mongoose = require('mongoose');

const { Schema } = mongoose;
const stopSchema = new Schema({
  location: {
    latitude: Number,
    longitude: Number
  },
  weather: {
    any: 'object' // will get from weather API
  },
  attendance: {
    type: Number
  }
});

module.exports = mongoose.model('Stops', stopSchema);