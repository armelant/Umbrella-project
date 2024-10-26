const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controllers/userController');
const checkAuth = require('./middlewares/checkAuth');
const validate = require('./utils/handleValidationErrors');

const { registerValidation, loginValidation } = require('./validations/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://umbrella:umbrella@cluster0.g5q1w.mongodb.net/umbrella?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

const umbrellaSchema = new mongoose.Schema({
  umbrella_id: Number,
  location_id: String,
  sensor_id: String,
  user_id: String,
  status: String,
});

const historySchema = new mongoose.Schema({
  umbrella_id: Number,
  rented_at: Date,
  rented_until: Date,
  user_id: String,
});

const Umbrellas = mongoose.model('Umbrellas', umbrellaSchema, 'Umbrellas');
const History = mongoose.model('History', historySchema, 'History');

app.post(
  '/auth/register',
  registerValidation,
  validate,
  userController.register
);
app.post('/auth/login', loginValidation, validate, userController.login);
app.get('/auth/me', checkAuth, userController.getMe);

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

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
