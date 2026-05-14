const supabase = require('../config/supabase');

const slugify = require('slugify');

const { v4: uuidv4 } = require('uuid');

const getNews = async (req, res) => {

  try {

    const { data, error } = await supabase
      .from('news')
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

const createNews = async (req, res) => {

  try {

    const { title, content } = req.body;

    if (!title || !content) {

      return res.status(400).json({
        success: false,
        message: 'Title dan content wajib diisi',
      });
    }

    let thumbnailUrl = null;

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName = `news/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('news')
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
          .from('news')
          .getPublicUrl(fileName);

      thumbnailUrl = publicUrlData.publicUrl;
    }

    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const { data, error } = await supabase
      .from('news')
      .insert([
        {
          title,
          slug,
          thumbnail: thumbnailUrl,
          content,
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
      message: 'Berita berhasil ditambahkan',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNews = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, content } = req.body;

    const updateData = {
      title,
      content,
      updated_at: new Date(),
    };

    if (title) {

      updateData.slug = slugify(title, {
        lower: true,
        strict: true,
      });
    }

    if (req.file) {

      const file = req.file;

      const fileExt = file.originalname
        .split('.')
        .pop();

      const fileName = `news/${uuidv4()}.${fileExt}`;

      const { error: uploadError } =
        await supabase.storage
          .from('news')
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
          .from('news')
          .getPublicUrl(fileName);

      updateData.thumbnail =
        publicUrlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('news')
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
      message: 'Berita berhasil diupdate',
      data,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNews = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await supabase
      .from('news')
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
      message: 'Berita berhasil dihapus',
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getNews,
  createNews,
  updateNews,
  deleteNews,
};