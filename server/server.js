const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const User = require('./models/User'); // Модель пользователя
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Регистрация пользователя
app.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email.endsWith('@student.hamk.fi')) {
      return res.status(400).json({ message: 'Email must end with @student.hamk.fi' });
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        email,
        password: hashedPassword,
        isVerified: false,
      });

      // Генерация кода подтверждения
      const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-значный код

      // Сохранение кода подтверждения в базе
      user.confirmationCode = confirmationCode;
      await user.save();

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Your confirmation code is: ${confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).json({ msg: 'Error sending verification email' });
        }
        res.status(200).json({ msg: 'Verification email sent' });
      });
    } catch (err) {
      console.error('Error in registration:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

app.post('/verify-email', async (req, res) => {
  const { email, confirmationCode } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error(`User with email ${email} not found`);
      return res.status(400).json({ msg: 'User not found. Please ensure you have registered with this email.' });
    }

    if (user.confirmationCode !== confirmationCode) {
      console.error(`Invalid confirmation code for user ${email}. Expected ${user.confirmationCode}, received ${confirmationCode}`);
      return res.status(400).json({ msg: 'Invalid confirmation code. Please check your email for the correct code.' });
    }

    user.isVerified = true;
    user.confirmationCode = null; // Удаляем код подтверждения после успешной верификации
    await user.save(); // Сохраняем обновленного пользователя
    console.log(`User ${email} successfully verified`);

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error('Error during email verification:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});





app.get('/buildings', async (req, res) => {
  try {
    const buildings = await Building.find({});
    res.json(buildings);
  } catch (error) {
    console.error('Error fetching buildings:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.get('/buildings/:buildingId/umbrellas', async (req, res) => {
  try {
    const { buildingId } = req.params;
    const umbrellas = await Umbrella.find({ building_id: buildingId, status: 'available' });
    res.json(umbrellas);
  } catch (error) {
    console.error('Error fetching umbrellas:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.post('/rent-umbrella', async (req, res) => {
  const { userId, umbrellaId } = req.body;

  try {
    const umbrella = await Umbrella.findOne({ umbrella_id: umbrellaId });
    if (!umbrella || umbrella.status !== 'available') {
      return res.status(400).json({ msg: 'Umbrella not available' });
    }

    umbrella.status = 'rented';
    umbrella.sensor_id = null; 
    umbrella.building_id = null; 
    await umbrella.save();

    const rentalHistory = new RentalHistory({
      user_id: userId,
      umbrella_id: umbrellaId,
      rented_at: new Date(),
    });
    await rentalHistory.save();

    res.status(200).json({ msg: 'Umbrella rented successfully' });
  } catch (error) {
    console.error('Error renting umbrella:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


app.post('/end-rental', async (req, res) => {
  const { rentalId } = req.body;

  try {
    const rentalHistory = await RentalHistory.findById(rentalId);
    if (!rentalHistory) {
      return res.status(400).json({ msg: 'Rental history not found' });
    }

    rentalHistory.returned_at = new Date();
    await rentalHistory.save();

    res.status(200).json({ msg: 'Rental ended successfully' });
  } catch (error) {
    console.error('Error ending rental:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
