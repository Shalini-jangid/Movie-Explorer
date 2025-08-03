const express = require('express');
const { signup, login, getProfile, logout } = require('../controllers/authController');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login',protect, login);
router.get('/profile',protect, getProfile);
router.post('/logout', logout);

module.exports = router;
