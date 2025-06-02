const express = require('express');

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();

/* Crear un todo (POST /api/todos) */
router.post('/', (req, res) => {
    const { task, dueDate } = req.body
    if (!task || !dueDate) return res.status(400).json({ error: 'Faltan datos obligatorios' });
    db.run(
        `INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
        [task, dueDate],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
        }
    )
})

router.get('/', (req, res) => {
    db.all(
        `SELECT * FROM todos`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    )
})

module.exports = router;