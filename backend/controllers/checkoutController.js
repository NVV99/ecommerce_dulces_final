const db = require('../config/db');

exports.finalizeOrder = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { address, city, zip, country, cartItems } = req.body;
    if (
      !address || !city || !zip || !country ||
      !Array.isArray(cartItems) || cartItems.length === 0
    ) {
      return res.status(400).json({ message: 'Datos del pedido inválidos.' });
    }

    // Inserta la dirección
    const [dirResult] = await db.query(
      `INSERT INTO direcciones_envio
         (usuario_id, calle, ciudad, codigo_postal, pais)
       VALUES (?, ?, ?, ?, ?)`,
      [usuarioId, address, city, zip, country]
    );
    const direccionEnvioId = dirResult.insertId;

    // Calcula total
    const total = cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );

    // Inserta el pedido
    const [orderResult] = await db.query(
      `INSERT INTO pedidos
         (usuario_id, direccion_envio_id, total, estado)
       VALUES (?, ?, ?, 'pendiente')`,
      [usuarioId, direccionEnvioId, total]
    );
    const orderId = orderResult.insertId;

    // Inserta detalles resolviendo el nombre al ID numérico
    for (const item of cartItems) {
      const [rows] = await db.query(
        `SELECT id FROM productos WHERE nombre = ?`,
        [item.name]
      );
      if (rows.length === 0) {
        throw new Error(`Producto no encontrado: ${item.name}`);
      }
      const productoId = rows[0].id;

      await db.query(
        `INSERT INTO detalles_pedido
           (pedido_id, producto_id, cantidad, precio_unitario)
         VALUES (?, ?, ?, ?)`,
        [orderId, productoId, item.quantity, item.unitPrice]
      );
    }

    return res.status(201).json({
      orderId,
      message: 'Pedido registrado correctamente.'
    });
  } catch (err) {
    console.error('[Error al finalizar pedido]', err);
    return res.status(500).json({ message: err.message });
  }
};
