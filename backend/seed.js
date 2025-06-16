const fs   = require('fs');
const path = require('path');
const db   = require('./config/db');
async function seed() {
  try {
    const schemaSql = fs.readFileSync(path.join(__dirname, '../database/schema.sql'), 'utf8');
    const seedSql   = fs.readFileSync(path.join(__dirname, '../database/seeders/seeder.sql'), 'utf8');

    await db.query(schemaSql);
    console.log('Schema importado');

    await db.query(seedSql);
    console.log('Datos semilla importados');

    process.exit(0);
  } catch (err) {
    console.error('Error al poblar la BBDD:', err);
    process.exit(1);
  }
}

seed();
