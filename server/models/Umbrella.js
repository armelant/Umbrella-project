const mongoose = require('mongoose');

const UmbrellaSchema = new mongoose.Schema({
  umbrella_id: String,
  building_id: String,
  status: {
    type: String,
    enum: ['available', 'rented']
  },
  sensor_id: String,
});

module.exports = mongoose.model('Umbrella', UmbrellaSchema);
