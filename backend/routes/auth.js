const express = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Registro
router.post(
  '/register',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('identifier').notEmpty().withMessage('Usuario/email es obligatorio'),
    body('password').notEmpty().withMessage('Contraseña es obligatoria')
  ],
  login
);

module.exports = router;
