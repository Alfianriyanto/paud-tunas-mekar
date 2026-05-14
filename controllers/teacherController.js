const supabase = require('../config/supabase');

const { v4: uuidv4 } = require('uuid');

const getTeachers = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('teachers')
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

const createTeacher = async (req, res) => {

  try {

    const { name, title } = req.body;

    if (!name || !title) {

      return res.status(400).json({
        success: false,
        message:
          'Nama dan title wajib diisi',
      });
    }

    let photoUrl = null;

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `teachers/${uuidv4()}.${fileExt}`;

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

      photoUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('teachers')
      .insert([
        {
          name,
          title,
          photo_url: photoUrl,
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
        'Staff pengajar berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, title } = req.body;

    const updateData = {
      name,
      title,
    };

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `teachers/${uuidv4()}.${fileExt}`;

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

      updateData.photo_url =
        publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('teachers')
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
        'Staff pengajar berhasil diupdate',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTeacher = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('teachers')
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
        'Staff pengajar berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};