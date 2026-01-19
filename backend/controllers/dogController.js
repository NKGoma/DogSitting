const Dog = require('../models/Dog');

// @desc    Hund erstellen
// @route   POST /api/dogs
// @access  Private
const createDog = async (req, res) => {
  try {
    const dog = await Dog.create({
      besitzer: req.user._id,
      ...req.body
    });

    res.status(201).json(dog);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Alle Hunde des aktuellen Benutzers abrufen
// @route   GET /api/dogs/my
// @access  Private
const getMyDogs = async (req, res) => {
  try {
    const dogs = await Dog.find({ besitzer: req.user._id });
    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Hund abrufen
// @route   GET /api/dogs/:id
// @access  Private
const getDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id).populate('besitzer', 'name email telefon postleitzahl');

    if (dog) {
      res.json(dog);
    } else {
      res.status(404).json({ message: 'Hund nicht gefunden' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Hund aktualisieren
// @route   PUT /api/dogs/:id
// @access  Private
const updateDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: 'Hund nicht gefunden' });
    }

    // Prüfen ob der Benutzer der Besitzer ist
    if (dog.besitzer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    const updatedDog = await Dog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedDog);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Hund löschen
// @route   DELETE /api/dogs/:id
// @access  Private
const deleteDog = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: 'Hund nicht gefunden' });
    }

    // Prüfen ob der Benutzer der Besitzer ist
    if (dog.besitzer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    await dog.deleteOne();

    res.json({ message: 'Hund gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Hundefoto hochladen
// @route   POST /api/dogs/:id/photo
// @access  Private
const uploadDogPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Keine Datei hochgeladen' });
    }

    const dog = await Dog.findById(req.params.id);

    if (!dog) {
      return res.status(404).json({ message: 'Hund nicht gefunden' });
    }

    // Prüfen ob der Benutzer der Besitzer ist
    if (dog.besitzer.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Nicht autorisiert' });
    }

    dog.foto = `/uploads/dogs/${req.file.filename}`;
    await dog.save();

    res.json({ foto: dog.foto });
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

module.exports = {
  createDog,
  getMyDogs,
  getDog,
  updateDog,
  deleteDog,
  uploadDogPhoto
};
