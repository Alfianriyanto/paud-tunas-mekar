const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} = require('../controllers/programServiceController');

router.get('/', getPrograms);

router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  createProgram
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  updateProgram
);

router.delete(
  '/:id',
  authMiddleware,
  deleteProgram
);

module.exports = router;