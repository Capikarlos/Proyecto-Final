const express = require('express');
const cors = require('cors')

const users = require('./routes/users');
const todos = require('./routes/todos');

/* ESTES ES MI SERVIDOR */
const app = express();

app.use(cors())
app.use(express.json())

console.log("Por cargar las rutas");

app.use('/api/user', users);
app.use('/api/todos', todos);

console.log("Rutas cargadas");

const PORT = 3005;

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`)
})