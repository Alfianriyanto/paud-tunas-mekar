const supabase = require('../config/supabase');

const getCurriculum = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('curriculums')
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

const saveCurriculum = async (req, res) => {

  try {

    const { description } = req.body;

    const { data: existingData } =
      await supabase
        .from('curriculums')
        .select('*')
        .limit(1);

    if (
      existingData &&
      existingData.length > 0
    ) {

      const existingId = existingData[0].id;

      const { data, error } =
        await supabase
          .from('curriculums')
          .update({
            description,
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
          'Kurikulum berhasil diupdate',
        data,
      });
    }

    const { data, error } = await supabase
      .from('curriculums')
      .insert([
        {
          description,
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
        'Kurikulum berhasil ditambahkan',
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
  getCurriculum,
  saveCurriculum,
};