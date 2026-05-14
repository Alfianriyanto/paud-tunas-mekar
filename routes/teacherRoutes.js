const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const upload = require('../middleware/uploadMiddleware');

const {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teacherController');

router.get('/', getTeachers);

router.post(
  '/',
  authMiddleware,
  upload.single('photo'),
  createTeacher
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('photo'),
  updateTeacher
);

router.delete(
  '/:id',
  authMiddleware,
  deleteTeacher
);

module.exports = router;