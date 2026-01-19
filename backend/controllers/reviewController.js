const Review = require('../models/Review');
const User = require('../models/User');

// @desc    Bewertung erstellen
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const { bewerteter, bewertung, kommentar, zeitraum } = req.body;

    // Prüfen ob User sich selbst bewertet
    if (req.user._id.toString() === bewerteter) {
      return res.status(400).json({ message: 'Sie können sich nicht selbst bewerten' });
    }

    const review = await Review.create({
      bewerter: req.user._id,
      bewerteter,
      bewertung,
      kommentar,
      zeitraum
    });

    // Durchschnittsbewertung aktualisieren
    await updateUserRating(bewerteter);

    const populatedReview = await Review.findById(review._id)
      .populate('bewerter', 'name profilbild')
      .populate('bewerteter', 'name');

    res.status(201).json(populatedReview);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Sie haben bereits eine Bewertung für diesen Zeitraum abgegeben' });
    }
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Bewertungen eines Benutzers abrufen
// @route   GET /api/reviews/user/:userId
// @access  Private
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bewerteter: req.params.userId })
      .populate('bewerter', 'name profilbild')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Eigene Bewertungen abrufen (abgegebene Bewertungen)
// @route   GET /api/reviews/my
// @access  Private
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bewerter: req.user._id })
      .populate('bewerteter', 'name profilbild')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Bewertung aktualisieren
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Bewertung nicht gefunden' });
    }

    // Prüfen ob der Benutzer der Bewerter ist
    if (review.bewerter.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    review.bewertung = req.body.bewertung || review.bewertung;
    review.kommentar = req.body.kommentar || review.kommentar;

    const updatedReview = await review.save();

    // Durchschnittsbewertung aktualisieren
    await updateUserRating(review.bewerteter);

    const populatedReview = await Review.findById(updatedReview._id)
      .populate('bewerter', 'name profilbild')
      .populate('bewerteter', 'name');

    res.json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Bewertung löschen
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Bewertung nicht gefunden' });
    }

    // Prüfen ob der Benutzer der Bewerter ist
    if (review.bewerter.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    const bewerteter = review.bewerteter;
    await review.deleteOne();

    // Durchschnittsbewertung aktualisieren
    await updateUserRating(bewerteter);

    res.json({ message: 'Bewertung gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// Hilfsfunktion: Durchschnittsbewertung eines Benutzers aktualisieren
const updateUserRating = async (userId) => {
  const reviews = await Review.find({ bewerteter: userId });

  if (reviews.length > 0) {
    const durchschnitt = reviews.reduce((acc, review) => acc + review.bewertung, 0) / reviews.length;

    await User.findByIdAndUpdate(userId, {
      durchschnittsBewertung: Math.round(durchschnitt * 10) / 10,
      anzahlBewertungen: reviews.length
    });
  } else {
    await User.findByIdAndUpdate(userId, {
      durchschnittsBewertung: 0,
      anzahlBewertungen: 0
    });
  }
};

module.exports = {
  createReview,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview
};
