const { body } = require('express-validator');

const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
];

const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
  body('fullName', 'Name must be at least 3 characters long').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Invalid avatar URL').optional().isURL(),
];

module.exports = {
  loginValidation,
  registerValidation,
};
