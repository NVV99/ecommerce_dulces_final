const db = require('../config/db');

exports.finalizeOrder = async (req, res) => {
  try {
    const { fullName, address, city, zip, phone, total, cartItems } = req.body;

    if (
      !fullName || !address || !city || !zip || !phone ||
      !cartItems || !Array.isArray(cartItems) || cartItems.length === 0
    ) {
      return res.status(400).json({ message: 'Datos del pedido inválidos.' });
    }

    const [orderResult] = await db.query(
      'INSERT INTO pedidos (nombre_completo, direccion, ciudad, cp, telefono, total, fecha, estado) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)',
      [fullName, address, city, zip, phone, total, 'pendiente']
    );

    const orderId = orderResult.insertId;

    const insertPromises = cartItems.map(item =>
      db.query(
        'INSERT INTO pedido_productos (pedido_id, nombre_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [orderId, item.name, item.quantity, item.unitPrice]
      )
    );

    await Promise.all(insertPromises);

    res.status(201).json({ message: 'Pedido registrado correctamente.', orderId });
  } catch (err) {
    console.error('[Error al finalizar pedido]', err);
    res.status(500).json({ message: 'Error al registrar el pedido.' });
  }
};
