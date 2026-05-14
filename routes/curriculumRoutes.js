const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getCurriculum,
  saveCurriculum,
} = require('../controllers/curriculumController');

router.get('/', getCurriculum);

router.post(
  '/',
  authMiddleware,
  saveCurriculum
);

module.exports = router;