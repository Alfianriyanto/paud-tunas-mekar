const express = require('express');
const router = express.Router();

const {
  loginAdmin,
  getProfile,
} = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;