const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} = require('../controllers/facilityController');

router.get('/', getFacilities);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createFacility
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  updateFacility
);

router.delete(
  '/:id',
  authMiddleware,
  deleteFacility
);

module.exports = router;