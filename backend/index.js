require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Middleware general
app.use(cors());

// Ruta del webhook
app.post('/api/webhook', express.raw({ type: 'application/json' }), require('./routes/webhook'));

// middlewares
app.use(express.json());

// Rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/contact', require('./routes/contact'));

// Servir frontend estático
app.use(express.static(path.join(__dirname, '../public')));

// Test DB
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('DB conectado');
  } catch (err) {
    console.error('Error de conexión a DB:', err);
  }
})();

// Error handler
app.use(errorHandler);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
