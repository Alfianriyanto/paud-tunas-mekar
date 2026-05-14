const supabase = require('../config/supabase');

const { v4: uuidv4 } = require('uuid');

const getSchoolProfile = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('school_profiles')
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

const saveSchoolProfile = async (
  req,
  res
) => {

  try {

    const {
      school_name,
      principal_name,
      welcome_message,
      address,
      operational_hours,
      whatsapp,
      instagram,
    } = req.body;

    let photoUrl = null;

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `school-profile/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('teachers')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
          });

      if (uploadError) {

        return res.status(500).json({
          success: false,
          message: uploadError.message,
        });
      }

      const { data: publicUrlData } =
        supabase.storage
          .from('teachers')
          .getPublicUrl(fileName);

      photoUrl =
        publicUrlData.publicUrl;
    }

    const { data: existingData } =
      await supabase
        .from('school_profiles')
        .select('*')
        .limit(1);

    if (
      existingData &&
      existingData.length > 0
    ) {

      const existingId =
        existingData[0].id;

      const updateData = {
        school_name,
        principal_name,
        welcome_message,
        address,
        operational_hours,
        whatsapp,
        instagram,
        updated_at: new Date(),
      };

      if (photoUrl) {

        updateData.photo_principal_url =
          photoUrl;
      }

      const { data, error } =
        await supabase
          .from('school_profiles')
          .update(updateData)
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
          'Profile sekolah berhasil diupdate',
        data,
      });
    }

    const { data, error } =
      await supabase
        .from('school_profiles')
        .insert([
          {
            school_name,
            principal_name,
            welcome_message,
            address,
            operational_hours,
            whatsapp,
            instagram,
            photo_principal_url:
              photoUrl,
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
        'Profile sekolah berhasil ditambahkan',
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
  getSchoolProfile,
  saveSchoolProfile,
};