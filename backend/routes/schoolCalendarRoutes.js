const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
  getCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
} = require('../controllers/schoolCalendarController');

router.get('/', getCalendars);

router.post(
  '/',
  authMiddleware,
  createCalendar
);

router.put(
  '/:id',
  authMiddleware,
  updateCalendar
);

router.delete(
  '/:id',
  authMiddleware,
  deleteCalendar
);

module.exports = router;