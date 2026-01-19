const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token aus dem Header holen
      token = req.headers.authorization.split(' ')[1];

      // Token verifizieren
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User aus der Datenbank holen (ohne Passwort)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Nicht autorisiert, Token fehlgeschlagen' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Nicht autorisiert, kein Token' });
  }
};

module.exports = { protect };
