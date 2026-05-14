const supabase = require('../config/supabase');

const { v4: uuidv4 } = require('uuid');

const getPrograms = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('programs_services')
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

const createProgram = async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title || !description) {

      return res.status(400).json({
        success: false,
        message:
          'Title dan description wajib diisi',
      });
    }

    let imageUrl = null;

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `programs/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('facilities')
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
          .from('facilities')
          .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('programs_services')
      .insert([
        {
          title,
          description,
          image_url: imageUrl,
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
        'Program berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProgram = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, description } = req.body;

    const updateData = {
      title,
      description,
    };

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `programs/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('facilities')
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
          .from('facilities')
          .getPublicUrl(fileName);

      updateData.image_url =
        publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('programs_services')
      .update(updateData)
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
        'Program berhasil diupdate',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProgram = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('programs_services')
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
        'Program berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
};