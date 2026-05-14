const supabase = require('../config/supabase');

const getVisionMission = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('visions_missions')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {

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

const saveVisionMission = async (req, res) => {

  try {

    const { vision, mission } = req.body;

    const { data: existingData } =
      await supabase
        .from('visions_missions')
        .select('*')
        .limit(1);

    if (
      existingData &&
      existingData.length > 0
    ) {

      const existingId = existingData[0].id;

      const { data, error } =
        await supabase
          .from('visions_missions')
          .update({
            vision,
            mission,
            updated_at: new Date(),
          })
          .eq('id', existingId)
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
          'Visi & Misi berhasil diupdate',
        data,
      });
    }

    const { data, error } = await supabase
      .from('visions_missions')
      .insert([
        {
          vision,
          mission,
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
        'Visi & Misi berhasil ditambahkan',
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
  getVisionMission,
  saveVisionMission,
};