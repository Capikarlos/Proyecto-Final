const express = require('express');
const db = require("../db");
const router = express.Router();

// Registrar usuario (POST /api/users)
router.post('/', (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Faltan datos obligatorios' });

    db.run(
        `INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)`,
        [name, email, password, phone || null],
        function (err) {
            if (err) return res.status(400).json({ erro: err.message });
            res.status(201).json({ id: this.lastID, name, email, phone })
        }
    )
})

module.exports = router;