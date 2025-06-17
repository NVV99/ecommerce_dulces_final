require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function runSeed() {
  // Crea conexión
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  try {
    // Vacia tabla usuarios y reiniciar AUTO_INCREMENT
    await pool.query('SET FOREIGN_KEY_CHECKS = 0');
    await pool.query('TRUNCATE TABLE usuarios');
    await pool.query('SET FOREIGN_KEY_CHECKS = 1');

    // Crea administrador único
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('admin123', salt);
    await pool.query(
      `INSERT INTO usuarios (nombre, email, telefono, contraseña, tipo) VALUES (?, ?, ?, ?, ?)`,
      ['Admin', 'admin@sakura.com', '666666666', hash, 'admin']
    );

    console.log(' Seed completado: administrador creado');
    process.exit(0);
  } catch (err) {
    console.error(' Error en el seed:', err);
    process.exit(1);
  }
}

runSeed();
