const supabase = require('../config/supabase');

const getCalendars = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('school_calendars')
      .select('*')
      .order('start_date', {
        ascending: true,
      });

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createCalendar = async (req, res) => {

  try {

    const {
      title,
      description,
      start_date,
      end_date,
    } = req.body;

    if (
      !title ||
      !description ||
      !start_date
    ) {

      return res.status(400).json({
        success: false,
        message:
          'Title, description, dan tanggal mulai wajib diisi',
      });
    }

    const finalEndDate =
      end_date || start_date;

    const { data, error } = await supabase
      .from('school_calendars')
      .insert([
        {
          title,
          description,
          start_date,
          end_date: finalEndDate,
        },
      ])
      .select();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      message:
        'Kalender berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCalendar = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      description,
      start_date,
      end_date,
    } = req.body;

    const finalEndDate =
      end_date || start_date;

    const { data, error } = await supabase
      .from('school_calendars')
      .update({
        title,
        description,
        start_date,
        end_date: finalEndDate,
      })
      .eq('id', id)
      .select();

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Kalender berhasil diupdate',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCalendar = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('school_calendars')
      .delete()
      .eq('id', id);

    if (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        'Kalender berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
};