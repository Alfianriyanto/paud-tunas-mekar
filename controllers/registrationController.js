const supabase = require('../config/supabase');

const getRegistrations = async (
  req,
  res
) => {

  try {

    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', {
        ascending: false,
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

const createRegistration = async (
  req,
  res
) => {

  try {

    const {
      child_name,
      child_birth_date,
      address,
      father_name,
      father_job,
      mother_name,
      mother_job,
      parent_income,
    } = req.body;

    if (
      !child_name ||
      !child_birth_date ||
      !address ||
      !father_name ||
      !mother_name
    ) {

      return res.status(400).json({
        success: false,
        message:
          'Data wajib belum lengkap',
      });
    }

    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          child_name,
          child_birth_date,
          address,
          father_name,
          father_job,
          mother_name,
          mother_job,
          parent_income,
          status:
            'Belum Dihubungi',
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
        'Pendaftaran berhasil dikirim',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRegistrationStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { status } = req.body;

      const { data, error } =
        await supabase
          .from('registrations')
          .update({
            status,
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
          'Status berhasil diupdate',
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  getRegistrations,
  createRegistration,
  updateRegistrationStatus,
};