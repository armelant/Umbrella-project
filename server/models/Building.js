const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  building_id: String,
  name: String,
  umbrella_count: Number,
});

module.exports = mongoose.model('Building', BuildingSchema);
