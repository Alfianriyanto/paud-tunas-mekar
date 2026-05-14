const supabase = require('../config/supabase');

const { v4: uuidv4 } = require('uuid');

const getTestimonials = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('testimonials')
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

const createTestimonial = async (req, res) => {

  try {

    const {
      parent_name,
      description,
    } = req.body;

    if (!parent_name || !description) {

      return res.status(400).json({
        success: false,
        message:
          'Nama orang tua dan deskripsi wajib diisi',
      });
    }

    let imageUrl = null;

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `testimonials/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('testimonials')
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
          .from('testimonials')
          .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('testimonials')
      .insert([
        {
          parent_name,
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
        'Testimoni berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTestimonial = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      parent_name,
      description,
    } = req.body;

    const updateData = {
      parent_name,
      description,
    };

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName =
        `testimonials/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('testimonials')
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
          .from('testimonials')
          .getPublicUrl(fileName);

      updateData.image_url =
        publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('testimonials')
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
        'Testimoni berhasil diupdate',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTestimonial = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('testimonials')
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
        'Testimoni berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};