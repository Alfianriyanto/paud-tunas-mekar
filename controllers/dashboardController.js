const supabase = require('../config/supabase');

const getDashboardStats = async (
  req,
  res
) => {

  try {

    const [
      newsResult,
      teachersResult,
      registrationsResult,
      testimonialsResult,
    ] = await Promise.all([

      supabase
        .from('news')
        .select('*', {
          count: 'exact',
          head: true,
        }),

      supabase
        .from('teachers')
        .select('*', {
          count: 'exact',
          head: true,
        }),

      supabase
        .from('registrations')
        .select('*', {
          count: 'exact',
          head: true,
        }),

      supabase
        .from('testimonials')
        .select('*', {
          count: 'exact',
          head: true,
        }),
    ]);

    return res.status(200).json({
      success: true,

      data: {
        total_news:
          newsResult.count || 0,

        total_teachers:
          teachersResult.count || 0,

        total_registrations:
          registrationsResult.count || 0,

        total_testimonials:
          testimonialsResult.count || 0,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};