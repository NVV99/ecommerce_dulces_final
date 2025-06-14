const db = require('../config/db');

// Obtener todos los productos
exports.getAllProducts = (req, res, next) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return next(err);
    res.json(results);
  });
};

// Obtener un producto por ID
exports.getProductById = (req, res, next) => {
  const { id } = req.params;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) return next(err);
    if (!results.length) return res.status(404).json({ msg: 'Producto no encontrado' });
    res.json(results[0]);
  });
};

// Crear producto (admin)
exports.createProduct = (req, res, next) => {
  const { nombre, descripcion, precio, stock, categoria_id, imagen } = req.body;
  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, imagen) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, stock, categoria_id, imagen],
    (err, result) => {
      if (err) return next(err);
      res.status(201).json({ id: result.insertId, msg: 'Producto creado' });
    }
  );
};
