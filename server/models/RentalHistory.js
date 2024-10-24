const mongoose = require('mongoose');

const RentalHistorySchema = new mongoose.Schema({
  user_id: String,
  umbrella_id: String,
  rented_at: Date,
  returned_at: Date,
});

module.exports = mongoose.model('RentalHistory', RentalHistorySchema);
