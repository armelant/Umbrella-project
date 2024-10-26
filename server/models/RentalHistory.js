const mongoose = require('mongoose');

const RentalHistorySchema = new mongoose.Schema({
  user_id: String,
  umbrella_id: String,
  status: {
    type: String,
    enum: ['active', 'finished'],
  },
  rented_at: Date,
  returned_at: Date,
});

module.exports = mongoose.model('RentalHistory', RentalHistorySchema);
