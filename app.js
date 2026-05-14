require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const dashboardRoutes = require('./routes/dashboardRoutes');
const heroBannerRoutes = require('./routes/heroBannerRoutes');
const newsRoutes = require('./routes/newsRoutes');
const visionMissionRoutes = require('./routes/visionMissionRoutes');
const programServiceRoutes = require('./routes/programServiceRoutes');
const curriculumRoutes = require('./routes/curriculumRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const schoolCalendarRoutes = require('./routes/schoolCalendarRoutes');
const schoolProfileRoutes = require('./routes/schoolProfileRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/dashboard',dashboardRoutes);
app.use('/api/hero-banners', heroBannerRoutes);
app.use('/api/school-profile', schoolProfileRoutes);
app.use('/api/school-calendars', schoolCalendarRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/curriculums', curriculumRoutes);
app.use('/api/programs-services', programServiceRoutes);
app.use('/api/vision-mission', visionMissionRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/registrations',registrationRoutes);

// ROUTES
const authRoutes = require('./routes/authRoutes');

// API ROUTES
app.use('/api/auth', authRoutes);

// ROOT
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'PAUD TUNAS MEKAR API RUNNING',
  });
});

// NOT FOUND
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
  });
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});