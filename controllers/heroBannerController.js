const supabase = require('../config/supabase');

const { v4: uuidv4 } = require('uuid');

const getHeroBanners = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('hero_banners')
      .select('*')
      .order('created_at', { ascending: false });

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

const createHeroBanner = async (req, res) => {

  try {

    const { title, subtitle } = req.body;

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: 'Image wajib diupload',
      });
    }

    const file = req.file;

    const fileExt = file.originalname.split('.').pop();

    const fileName = `hero/${uuidv4()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('hero')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (uploadError) {

      return res.status(500).json({
        success: false,
        message: uploadError.message,
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from('hero')
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    const { data, error } = await supabase
      .from('hero_banners')
      .insert([
        {
          title,
          subtitle,
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
      message: 'Hero banner berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteHeroBanner = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('hero_banners')
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
      message: 'Hero banner berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getHeroBanners,
  createHeroBanner,
  deleteHeroBanner,
};