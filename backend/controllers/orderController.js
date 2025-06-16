const db = require('../config/db');

// Crear pedido
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

    // Insertar dirección
    const [addr] = await conn.query(
      `INSERT INTO direcciones_envio (usuario_id, calle, ciudad, codigo_postal, pais)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, address, city, zip, 'España']
    );
    const direccionEnvioId = addr.insertId;

    // Insertar pedido
    const [ord] = await conn.query(
      `INSERT INTO pedidos (usuario_id, direccion_envio_id, total, estado, fecha)
       VALUES (?, ?, ?, 'pendiente', NOW())`,
      [userId, direccionEnvioId, total]
    );
    const pedidoId = ord.insertId;

    // Insertar detalles del pedido
    for (const item of items) {
      const [rows] = await conn.query(
        'SELECT id FROM productos WHERE nombre = ?',
        [item.name]
      );
      if (rows.length === 0) {
        return res.status(400).json({ message: `Producto no encontrado: ${item.name}` });
      }
      const productoId = rows[0].id;

      await conn.query(
        `INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario)
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

// Historial de pedidos del usuario autenticado
async function getUserOrders(req, res) {
  const userId = req.user.id;

  try {
    const [orders] = await db.query(
      `SELECT p.id, p.total, p.estado, p.fecha,
              d.calle, d.ciudad, d.codigo_postal, d.pais
       FROM pedidos p
       JOIN direcciones_envio d ON p.direccion_envio_id = d.id
       WHERE p.usuario_id = ?
       ORDER BY p.fecha DESC`,
      [userId]
    );

    for (const order of orders) {
      const [items] = await db.query(
        `SELECT dp.cantidad, dp.precio_unitario, pr.nombre
         FROM detalles_pedido dp
         JOIN productos pr ON dp.producto_id = pr.id
         WHERE dp.pedido_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json(orders);
  } catch (err) {
    console.error('[getUserOrders error]', err);
    res.status(500).json({ message: 'Error al obtener los pedidos del usuario.' });
  }
}

// Todos los pedidos (admin)
async function getAllOrders(req, res) {
  if (req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  try {
    const [orders] = await db.query(
      `SELECT p.id, p.total, p.estado, p.fecha,
              u.nombre as cliente, d.calle, d.ciudad, d.codigo_postal, d.pais
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.id
       JOIN direcciones_envio d ON p.direccion_envio_id = d.id
       ORDER BY p.fecha DESC`
    );

    for (const order of orders) {
      const [items] = await db.query(
        `SELECT dp.cantidad, dp.precio_unitario, pr.nombre
         FROM detalles_pedido dp
         JOIN productos pr ON dp.producto_id = pr.id
         WHERE dp.pedido_id = ?`,
        [order.id]
      );
      order.items = items;
    }

    res.json(orders);
  } catch (err) {
    console.error('[getAllOrders error]', err);
    res.status(500).json({ message: 'Error al obtener los pedidos.' });
  }
}

// Cambiar estado del pedido (admin)
async function updateOrderStatus(req, res) {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ['pendiente', 'pagado', 'enviado', 'cancelado'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido.' });
  }

  try {
    const [result] = await db.query(
      'UPDATE pedidos SET estado = ? WHERE id = ?',
      [estado, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    res.json({ message: 'Estado actualizado correctamente.' });
  } catch (err) {
    console.error('[updateOrderStatus error]', err);
    res.status(500).json({ message: 'Error al actualizar el estado del pedido.' });
  }
}

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};
