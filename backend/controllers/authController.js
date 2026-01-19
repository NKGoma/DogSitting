const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// JWT Token generieren
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Benutzer registrieren
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, postleitzahl, rolle, telefon } = req.body;

    // Prüfen ob User bereits existiert
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Benutzer existiert bereits' });
    }

    // User erstellen
    const user = await User.create({
      name,
      email,
      password,
      postleitzahl,
      rolle,
      telefon
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        postleitzahl: user.postleitzahl,
        rolle: user.rolle,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Ungültige Benutzerdaten' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Benutzer einloggen
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User suchen
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        postleitzahl: user.postleitzahl,
        rolle: user.rolle,
        profilbild: user.profilbild,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Ungültige E-Mail oder Passwort' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Aktuellen Benutzer abrufen
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe
};
