/* Importamos SQLIte3 */
const sqlite3 = require('sqlite3').verbose();
/* Creamos instancia de base de datos */
const db = new sqlite3.Database('./data.sqlite', (err) => {
    if (err) throw err;
});

// corremos la creación de las tablas necesarias (en caso que no existan)
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT
    );
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      dueDate TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0
    );
  `);
});

module.exports = db;
