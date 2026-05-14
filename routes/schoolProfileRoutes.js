const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getSchoolProfile,
  saveSchoolProfile,
} = require('../controllers/schoolProfileController');

router.get('/', getSchoolProfile);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  saveSchoolProfile
);

module.exports = router;