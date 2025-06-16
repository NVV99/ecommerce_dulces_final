const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

const DB_HOST = process.env.DB_HOST || 'mysql-ecommerce'; // Host interno en Render
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'SakuraSukiTFG2025';
const DB_NAME = process.env.DB_NAME || 'ecommerce_dulces';

async function importSchema() {
  const schemaPath = path.join(__dirname, './database/schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    multipleStatements: true,
  });

  try {
    await connection.query(schemaSql);
    console.log('Esquema importado correctamente');
  } catch (err) {
    console.error('Error al importar esquema:', err);
  } finally {
    await connection.end();
  }
}

importSchema();
