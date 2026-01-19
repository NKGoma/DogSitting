const User = require('../models/User');
const Dog = require('../models/Dog');

// Hilfsfunktion: Entfernung zwischen zwei Postleitzahlen berechnen (vereinfacht)
// In einer echten Anwendung würde man eine Geocoding-API verwenden
const calculateDistance = (plz1, plz2) => {
  // Vereinfachte Berechnung basierend auf den ersten beiden Ziffern der PLZ
  const zone1 = parseInt(plz1.substring(0, 2));
  const zone2 = parseInt(plz2.substring(0, 2));

  // Ungefähre Entfernung in km (sehr vereinfacht)
  const zoneDiff = Math.abs(zone1 - zone2);
  return zoneDiff * 50; // Grobe Schätzung: 50km pro Zone
};

// @desc    Nach Hundesittern suchen
// @route   GET /api/search/sitters
// @access  Private
const searchSitters = async (req, res) => {
  try {
    const { postleitzahl, maxEntfernung, verfuegbarerTag, hundegroesse, erfahrung } = req.query;

    // Basis-Query
    let query = {
      rolle: { $in: ['hundesitter', 'beides'] }
    };

    // Filter nach verfügbarem Tag
    if (verfuegbarerTag) {
      query.verfuegbareTage = verfuegbarerTag;
    }

    // Filter nach Erfahrung
    if (erfahrung) {
      query.erfahrung = erfahrung;
    }

    // Filter nach Hundegröße
    if (hundegroesse === 'klein') {
      // Alle Sitter akzeptieren
      query.platzverfuegbarkeit = { $in: ['klein', 'mittel', 'gross'] };
    } else if (hundegroesse === 'mittel') {
      // Nur Sitter mit mittel oder groß
      query.$or = [
        { platzverfuegbarkeit: { $in: ['mittel', 'gross'] }, nurKleineHunde: false },
        { platzverfuegbarkeit: { $in: ['mittel', 'gross'] }, nurKleineHunde: { $exists: false } }
      ];
    } else if (hundegroesse === 'gross') {
      // Nur Sitter mit groß
      query.$and = [
        { platzverfuegbarkeit: 'gross' },
        { nurKleineHunde: false }
      ];
    }

    let sitters = await User.find(query).select('-password');

    // Filter nach Entfernung
    if (postleitzahl && maxEntfernung) {
      sitters = sitters.filter(sitter => {
        const distance = calculateDistance(postleitzahl, sitter.postleitzahl);
        return distance <= parseInt(maxEntfernung);
      });

      // Entfernung hinzufügen
      sitters = sitters.map(sitter => {
        const distance = calculateDistance(postleitzahl, sitter.postleitzahl);
        return {
          ...sitter.toObject(),
          entfernung: distance
        };
      });

      // Nach Entfernung sortieren
      sitters.sort((a, b) => a.entfernung - b.entfernung);
    }

    res.json(sitters);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Nach Hundebesitzern suchen
// @route   GET /api/search/owners
// @access  Private
const searchOwners = async (req, res) => {
  try {
    const { postleitzahl, maxEntfernung, hundegroesse } = req.query;

    // Basis-Query
    let query = {
      rolle: { $in: ['hundebesitzer', 'beides'] }
    };

    let owners = await User.find(query).select('-password');

    // Hunde für jeden Besitzer abrufen
    const ownersWithDogs = await Promise.all(
      owners.map(async (owner) => {
        const dogs = await Dog.find({ besitzer: owner._id });
        return {
          ...owner.toObject(),
          hunde: dogs
        };
      })
    );

    // Filter nach Hundegröße
    let filteredOwners = ownersWithDogs;
    if (hundegroesse) {
      filteredOwners = ownersWithDogs.filter(owner =>
        owner.hunde.some(dog => dog.groesse === hundegroesse)
      );
    }

    // Filter nach Entfernung
    if (postleitzahl && maxEntfernung) {
      filteredOwners = filteredOwners.filter(owner => {
        const distance = calculateDistance(postleitzahl, owner.postleitzahl);
        return distance <= parseInt(maxEntfernung);
      });

      // Entfernung hinzufügen
      filteredOwners = filteredOwners.map(owner => {
        const distance = calculateDistance(postleitzahl, owner.postleitzahl);
        return {
          ...owner,
          entfernung: distance
        };
      });

      // Nach Entfernung sortieren
      filteredOwners.sort((a, b) => a.entfernung - b.entfernung);
    }

    res.json(filteredOwners);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

// @desc    Nach Hunden suchen
// @route   GET /api/search/dogs
// @access  Private
const searchDogs = async (req, res) => {
  try {
    const { groesse, rasse, charaktereigenschaft } = req.query;

    let query = {};

    if (groesse) {
      query.groesse = groesse;
    }

    if (rasse) {
      query.rasse = { $regex: rasse, $options: 'i' };
    }

    if (charaktereigenschaft) {
      query.charaktereigenschaften = charaktereigenschaft;
    }

    const dogs = await Dog.find(query).populate('besitzer', 'name postleitzahl telefon email profilbild');

    res.json(dogs);
  } catch (error) {
    res.status(500).json({ message: 'Serverfehler', error: error.message });
  }
};

module.exports = {
  searchSitters,
  searchOwners,
  searchDogs
};
