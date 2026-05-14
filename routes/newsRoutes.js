const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');

router.get('/', getNews);

router.post(
  '/',
  authMiddleware,
  upload.single('thumbnail'),
  createNews
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('thumbnail'),
  updateNews
);

router.delete(
  '/:id',
  authMiddleware,
  deleteNews
);

module.exports = router;