const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getVisionMission,
  saveVisionMission,
} = require('../controllers/visionMissionController');

router.get('/', getVisionMission);

router.post(
  '/',
  authMiddleware,
  saveVisionMission
);

module.exports = router;