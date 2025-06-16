const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const { fullName, address, city, zip, phone, total, items } = req.body;

    if (!fullName || !address || !city || !zip || !phone || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Datos del pedido incompletos.' });
    }

    const [pedidoResult] = await db.query(
      'INSERT INTO pedidos (nombre_completo, direccion, ciudad, cp, telefono, total, fecha, estado) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)',
      [fullName, address, city, zip, phone, total, 'pendiente']
    );

    const pedidoId = pedidoResult.insertId;

    for (const item of items) {
      await db.query(
        'INSERT INTO pedido_productos (pedido_id, nombre_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [pedidoId, item.name, item.quantity, item.unitPrice]
      );
    }

    res.status(201).json({ message: 'Pedido creado correctamente', orderId: pedidoId });
  } catch (err) {
    console.error('[Error en /orders POST]:', err);
    res.status(500).json({ message: 'Error interno al registrar el pedido' });
  }
});

// Ruta para obtener todos los pedidos (administrador)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        id,
        nombre_completo AS cliente,
        fecha,
        total,
        estado
      FROM pedidos
      ORDER BY fecha DESC
    `);

    res.json(orders);
  } catch (err) {
    console.error('[Error GET /orders]:', err);
    res.status(500).json({ message: 'Error al obtener pedidos' });
  }
});

// Ruta para obtener los pedidos del usuario autenticado
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [orders] = await db.query(
      'SELECT id, fecha, total, estado FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC',
      [userId]
    );

    res.json(orders);
  } catch (err) {
    console.error('[Error GET /orders/mine]:', err);
    res.status(500).json({ message: 'Error al obtener historial de pedidos' });
  }
});

// Ruta para actualizar el estado de un pedido
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const orderId = req.params.id;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: 'Estado es requerido' });
    }

    const [result] = await db.query(
      'UPDATE pedidos SET estado = ? WHERE id = ?',
      [estado, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }

    res.json({ message: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error('[Error PATCH /orders/:id/status]:', err);
    res.status(500).json({ message: 'Error al actualizar estado' });
  }
});

module.exports = router;
