const db = require('../config/db');

async function createMessage({ userId, nombre, email, mensaje }) {
  const sql = `
    INSERT INTO mensajes_contacto (usuario_id, nombre, email, mensaje)
    VALUES (?, ?, ?, ?)
  `;
  return db.execute(sql, [userId, nombre, email, mensaje]);
}

module.exports = {
  createMessage
};
