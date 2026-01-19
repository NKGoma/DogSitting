const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validierung für Registrierung
const registerValidation = [
  body('name').notEmpty().withMessage('Name ist erforderlich'),
  body('email').isEmail().withMessage('Gültige E-Mail ist erforderlich'),
  body('password').isLength({ min: 6 }).withMessage('Passwort muss mindestens 6 Zeichen lang sein'),
  body('postleitzahl').notEmpty().withMessage('Postleitzahl ist erforderlich'),
  body('rolle').isIn(['hundebesitzer', 'hundesitter', 'beides']).withMessage('Ungültige Rolle')
];

router.post('/register', registerValidation, register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
