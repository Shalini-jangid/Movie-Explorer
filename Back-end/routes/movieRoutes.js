const express = require('express');
const router = express.Router();
const {
  fetchAndStoreMovies,
  getMovies
} = require('../controllers/movieController');

const protect = require('../middleware/auth');

// @route   GET /api/movies/populate
// @desc    Fetch and store movies from TMDB
// @access  Private
router.get('/populate', protect, fetchAndStoreMovies);

// @route   GET /api/movies
// @desc    Get movies with filtering, pagination, etc.
// @access  Public
router.get('/', getMovies);

module.exports = router;
