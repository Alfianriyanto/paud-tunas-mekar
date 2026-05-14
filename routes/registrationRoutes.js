const express = require('express');

const router = express.Router();

const authMiddleware =
  require('../middleware/authMiddleware');

const {
  getRegistrations,
  createRegistration,
  updateRegistrationStatus,
} = require('../controllers/registrationController');

router.post(
  '/',
  createRegistration
);

router.get(
  '/',
  authMiddleware,
  getRegistrations
);

router.put(
  '/:id/status',
  authMiddleware,
  updateRegistrationStatus
);

module.exports = router;