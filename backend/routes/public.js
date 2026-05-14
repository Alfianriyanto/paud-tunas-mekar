const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Ambil Profil & Sambutan
router.get('/profile', async (req, res) => {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (error) return res.status(400).json(error);
    res.json(data);
});

// Ambil List Guru (Staff)
router.get('/staff', async (req, res) => {
    const { data, error } = await supabase.from('staff').select('*').order('order_priority', { ascending: true });
    if (error) return res.status(400).json(error);
    res.json(data);
});

// Ambil Artikel/Berita
router.get('/articles', async (req, res) => {
    const { data, error } = await supabase.from('articles').select('*').order('created_at', { ascending: false });
    if (error) return res.status(400).json(error);
    res.json(data);
});

// Form Pendaftaran Murid Baru
router.post('/register-student', async (req, res) => {
    const { student_name, parent_name, phone_number, email, message } = req.body;
    const { data, error } = await supabase
        .from('registrations')
        .insert([{ student_name, parent_name, phone_number, email, message, status: 'pending' }]);
    
    if (error) return res.status(400).json(error);
    res.json({ message: 'Pendaftaran berhasil dikirim!' });
});

module.exports = router;