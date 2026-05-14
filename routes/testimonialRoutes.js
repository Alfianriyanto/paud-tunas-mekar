const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

router.get('/', getTestimonials);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createTestimonial
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  updateTestimonial
);

router.delete(
  '/:id',
  authMiddleware,
  deleteTestimonial
);

module.exports = router;