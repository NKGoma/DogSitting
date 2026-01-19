const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  besitzer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Bitte geben Sie einen Hundenamen ein'],
    trim: true
  },
  rasse: {
    type: String,
    required: [true, 'Bitte geben Sie eine Rasse ein'],
    trim: true
  },
  groesse: {
    type: String,
    enum: ['klein', 'mittel', 'gross'],
    required: [true, 'Bitte wählen Sie eine Größe']
  },
  alter: {
    type: Number,
    required: [true, 'Bitte geben Sie das Alter ein'],
    min: 0
  },
  geschlecht: {
    type: String,
    enum: ['männlich', 'weiblich'],
    required: true
  },
  charaktereigenschaften: [{
    type: String,
    enum: ['freundlich', 'energiegeladen', 'ruhig', 'verspielt', 'ängstlich', 'dominant', 'gutmütig', 'schüchtern']
  }],
  vertraeglichMitHunden: {
    type: Boolean,
    default: true
  },
  vertraeglichMitKatzen: {
    type: Boolean,
    default: true
  },
  vertraeglichMitKindern: {
    type: Boolean,
    default: true
  },
  besonderheiten: {
    type: String,
    maxlength: 500
  },
  foto: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Dog', dogSchema);
