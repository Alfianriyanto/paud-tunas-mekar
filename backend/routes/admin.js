const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const { verifyAdmin } = require('../middleware/auth');

// Gunakan middleware untuk semua route admin
router.use(verifyAdmin);

// -- ARTIKEL --
// Tambah Artikel
router.post('/articles', async (req, res) => {
    const { title, slug, content, thumbnail_url, author } = req.body;
    const { data, error } = await supabase.from('articles').insert([req.body]);
    if (error) return res.status(400).json(error);
    res.json({ message: 'Artikel berhasil di-publish!' });
});

// Hapus Artikel
router.delete('/articles/:id', async (req, res) => {
    const { error } = await supabase.from('articles').delete().eq('id', req.params.id);
    if (error) return res.status(400).json(error);
    res.json({ message: 'Artikel dihapus.' });
});

// -- PENDAFTARAN --
// Lihat Semua Pendaftaran
router.get('/registrations', async (req, res) => {
    const { data, error } = await supabase.from('registrations').select('*').order('created_at', { ascending: false });
    if (error) return res.status(400).json(error);
    res.json(data);
});

// Update Status Pendaftaran (misal: sudah dihubungi)
router.put('/registrations/:id', async (req, res) => {
    const { status } = req.body;
    const { error } = await supabase.from('registrations').update({ status }).eq('id', req.params.id);
    if (error) return res.status(400).json(error);
    res.json({ message: 'Status pendaftaran diperbarui.' });
});

module.exports = router;