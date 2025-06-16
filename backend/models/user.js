const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Buscar usuario por email
async function findByEmail(email) {
  const [rows] = await db.query(
    `SELECT 
       id, 
       nombre, 
       email, 
       telefono, 
       contraseña AS password, 
       tipo 
     FROM usuarios 
     WHERE email = ?`,
    [email]
  );
  return rows[0] || null;
}

// Buscar usuario por nombre de usuario
async function findByUsername(username) {
  const [rows] = await db.query(
    `SELECT 
       id, 
       nombre, 
       email, 
       telefono, 
       contraseña AS password, 
       tipo 
     FROM usuarios 
     WHERE nombre = ?`,
    [username]
  );
  return rows[0] || null;
}

// Buscar usuario por ID
async function findById(id) {
  const [rows] = await db.query(
    `SELECT 
       id, 
       nombre, 
       email, 
       telefono, 
       contraseña AS password, 
       tipo 
     FROM usuarios 
     WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

// Crear usuario (recibe la contraseña ya hasheada)
async function createUser({ nombre, email, password, telefono, tipo = 'cliente' }) {
  const [result] = await db.query(
    `INSERT INTO usuarios 
       (nombre, email, telefono, contraseña, tipo) 
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, email, telefono, password, tipo]
  );
  const insertedId = result.insertId;
  return findById(insertedId);
}

// Verificar contraseña
async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = {
  findByEmail,
  findByUsername,
  findById,
  createUser,
  verifyPassword
};
