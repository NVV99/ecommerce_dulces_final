const db = require('../config/db');

// Crear un pedido
exports.createOrder = (req, res, next) => {
  const { user_id, items, total } = req.body;
  db.query(
    'INSERT INTO pedidos (user_id, total, estado) VALUES (?, ?, "pendiente")',
    [user_id, total],
    (err, result) => {
      if (err) return next(err);
      const orderId = result.insertId;
      const detalles = items.map(i => [orderId, i.producto_id, i.cantidad, i.precio]);
      db.query(
        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio) VALUES ?',
        [detalles],
        err2 => {
          if (err2) return next(err2);
          // Ajustar stock
          items.forEach(i => {
            db.query(
              'UPDATE productos SET stock = stock - ? WHERE id = ?',
              [i.cantidad, i.producto_id],
              () => {}
            );
          });
          res.status(201).json({ orderId, msg: 'Pedido creado' });
        }
      );
    }
  );
};

// Obtener pedidos por usuario
exports.getOrdersByUser = (req, res, next) => {
  const userId = req.user.id;
  db.query(
    'SELECT * FROM pedidos WHERE user_id = ? ORDER BY fecha_creacion DESC',
    [userId],
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
};

// Actualizar estado (admin)
exports.updateOrderStatus = (req, res, next) => {
  const { id } = req.params;
  const { estado } = req.body;
  db.query(
    'UPDATE pedidos SET estado = ? WHERE id = ?',
    [estado, id],
    err => {
      if (err) return next(err);
      res.json({ msg: 'Estado actualizado' });
    }
  );
};
