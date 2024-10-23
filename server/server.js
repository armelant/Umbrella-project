const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://evgeny22000:keuJE8gzLtKbQQBK@cluster0.enpq6.mongodb.net/Umbrella?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Database connection error:', err));

const umbrellaSchema = new mongoose.Schema({
  umbrella_id: Number,
  location_id: String,
  sensor_id: String,
  user_id: String,
  status: String
});

const historySchema = new mongoose.Schema({
  umbrella_id: Number,
  rented_at: Date,
  rented_until: Date,
  user_id: String,
});

const Umbrellas = mongoose.model('Umbrellas', umbrellaSchema, 'Umbrellas'); 
const History = mongoose.model('History', historySchema, 'History'); 

app.get('/umbrellas', async (req, res) => {
  try {
    const umbrellas = await Umbrellas.find();
    res.json(umbrellas);
  } catch (error) {
    console.error('Error fetching umbrellas:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/history', async (req, res) => {
  try {
    const history = await History.find();
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: error.message });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
