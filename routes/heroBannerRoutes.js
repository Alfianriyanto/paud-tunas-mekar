const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getHeroBanners,
  createHeroBanner,
  deleteHeroBanner,
} = require('../controllers/heroBannerController');

router.get('/', getHeroBanners);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createHeroBanner
);

router.delete(
  '/:id',
  authMiddleware,
  deleteHeroBanner
);

module.exports = router;