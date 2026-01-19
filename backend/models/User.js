const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bitte geben Sie einen Namen ein'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Bitte geben Sie eine E-Mail-Adresse ein'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Bitte geben Sie ein Passwort ein'],
    minlength: 6
  },
  telefon: {
    type: String,
    trim: true
  },
  postleitzahl: {
    type: String,
    required: [true, 'Bitte geben Sie eine Postleitzahl ein'],
    trim: true
  },
  rolle: {
    type: String,
    enum: ['hundebesitzer', 'hundesitter', 'beides'],
    required: [true, 'Bitte wählen Sie eine Rolle']
  },
  profilbild: {
    type: String,
    default: ''
  },
  // Für Hundesitter
  verfuegbareTage: [{
    type: String,
    enum: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']
  }],
  platzverfuegbarkeit: {
    type: String,
    enum: ['klein', 'mittel', 'gross'],
    default: 'mittel'
  },
  nurKleineHunde: {
    type: Boolean,
    default: false
  },
  erfahrung: {
    type: String,
    enum: ['keine', 'wenig', 'mittel', 'viel', 'profi'],
    default: 'keine'
  },
  beschreibung: {
    type: String,
    maxlength: 500
  },
  // Bewertungen
  durchschnittsBewertung: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  anzahlBewertungen: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Passwort hashen vor dem Speichern
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Methode zum Vergleichen von Passwörtern
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
