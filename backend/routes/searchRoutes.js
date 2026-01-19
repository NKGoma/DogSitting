const express = require('express');
const router = express.Router();
const {
  searchSitters,
  searchOwners,
  searchDogs
} = require('../controllers/searchController');
const { protect } = require('../middleware/auth');

router.get('/sitters', protect, searchSitters);
router.get('/owners', protect, searchOwners);
router.get('/dogs', protect, searchDogs);

module.exports = router;
