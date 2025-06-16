// backend/controllers/orderController.js

const db = require('../config/db');

async function createOrder(req, res, next) {
  const userId = req.user.id;
  const { fullName, address, city, zip, phone, total, items } = req.body;

  // Validaciones
  if (!fullName || !address || !city || !zip || !phone) {
    return res.status(400).json({ message: 'Completa todos los datos de envío.' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'El carrito está vacío.' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1) Insertar dirección de envío
    const [addr] = await conn.query(
      `INSERT INTO direcciones_envio
         (usuario_id, calle, ciudad, codigo_postal, pais)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, address, city, zip, 'España']
    );
    const direccionEnvioId = addr.insertId;

    // 2) Insertar registro en pedidos
    const [ord] = await conn.query(
      `INSERT INTO pedidos
         (usuario_id, direccion_envio_id, total, estado, fecha)
       VALUES (?, ?, ?, 'pendiente', NOW())`,
      [userId, direccionEnvioId, total]
    );
    const pedidoId = ord.insertId;

    // 3) Insertar detalles del pedido (buscando ID por nombre)
    for (const item of items) {
      const [rows] = await conn.query(
        'SELECT id FROM productos WHERE nombre = ?',
        [item.name]
      );
      if (rows.length === 0) {
        return res.status(400).json({ message: `Producto no encontrado en BD: ${item.name}` });
      }
      const productoId = rows[0].id;

      await conn.query(
        `INSERT INTO detalles_pedido
           (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [pedidoId, productoId, item.quantity, item.unitPrice]
      );
    }

    await conn.commit();
    return res.status(201).json({ orderId: pedidoId });
  } catch (err) {
    await conn.rollback();
    console.error('[createOrder error]', err);
    return res.status(500).json({ message: 'Error interno al crear el pedido.' });
  } finally {
    conn.release();
  }
}

module.exports = { createOrder };
