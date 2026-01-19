const express = require('express');
const router = express.Router();
const {
  createDog,
  getMyDogs,
  getDog,
  updateDog,
  deleteDog,
  uploadDogPhoto
} = require('../controllers/dogController');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Konfiguration für Hundefotos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/dogs/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'dog-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Nur Bilder sind erlaubt (jpeg, jpg, png, gif)'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

router.post('/', protect, createDog);
router.get('/my', protect, getMyDogs);
router.get('/:id', protect, getDog);
router.put('/:id', protect, updateDog);
router.delete('/:id', protect, deleteDog);
router.post('/:id/photo', protect, upload.single('photo'), uploadDogPhoto);

module.exports = router;
