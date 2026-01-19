const User = require('../models/User');
const Dog = require('../models/Dog');

// @desc    Profil aktualisieren
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.telefon = req.body.telefon || user.telefon;
      user.postleitzahl = req.body.postleitzahl || user.postleitzahl;
      user.rolle = req.body.rolle || user.rolle;
      user.verfuegbareTage = req.body.verfuegbareTage || user.verfuegbareTage;
      user.platzverfuegbarkeit = req.body.platzverfuegbarkeit || user.platzverfuegbarkeit;
      user.nurKleineHunde = req.body.nurKleineHunde !== undefined ? req.body.nurKleineHunde : user.nurKleineHunde;
      user.erfahrung = req.body.erfahrung || user.erfahrung;
      user.beschreibung = req.body.beschreibung || user.beschreibung;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        telefon: updatedUser.telefon,
        postleitzahl: updatedUser.postleitzahl,
        rolle: updatedUser.rolle,
        profilbild: updatedUser.profilbild,
        verfuegbareTage: updatedUser.verfuegbareTage,
        platzverfuegbarkeit: updatedUser.platzverfuegbarkeit,
        nurKleineHunde: updatedUser.nurKleineHunde,
        erfahrung: updatedUser.erfahrung,
        beschreibung: updatedUser.beschreibung,
        durchschnittsBewertung: updatedUser.durchschnittsBewertung,
        anzahlBewertungen: updatedUser.anzahlBewertungen
      });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Profilbild hochladen
// @route   POST /api/users/profile/photo
// @access  Private
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Keine Datei hochgeladen' });
    }

    const user = await User.findById(req.user._id);

    if (user) {
      user.profilbild = `/uploads/profiles/${req.file.filename}`;
      await user.save();

      res.json({ profilbild: user.profilbild });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Benutzerprofil abrufen
// @route   GET /api/users/:id
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
      // Hunde des Benutzers abrufen
      const dogs = await Dog.find({ besitzer: user._id });

      res.json({
        ...user.toObject(),
        hunde: dogs
      });
    } else {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Alle Benutzer abrufen (für Admin)
// @route   GET /api/users
// @access  Private
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

module.exports = {
  updateProfile,
  uploadProfilePhoto,
  getUserProfile,
  getUsers
};
