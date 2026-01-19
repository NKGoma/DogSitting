const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bewerter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bewerteter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bewertung: {
    type: Number,
    required: [true, 'Bitte geben Sie eine Bewertung ab'],
    min: 1,
    max: 5
  },
  kommentar: {
    type: String,
    maxlength: 500
  },
  zeitraum: {
    von: {
      type: Date,
      required: true
    },
    bis: {
      type: Date,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Verhindere mehrfache Bewertungen für denselben Zeitraum
reviewSchema.index({ bewerter: 1, bewerteter: 1, 'zeitraum.von': 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
