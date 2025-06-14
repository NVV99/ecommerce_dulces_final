const db = require('../config/db');

// Perfil de usuario
exports.getUserProfile = (req, res, next) => {
  const userId = req.user.id;
  db.query(
    'SELECT id, nombre, email, telefono, tipo, fecha_registro FROM usuarios WHERE id = ?',
    [userId],
    (err, results) => {
      if (err) return next(err);
      res.json(results[0]);
    }
  );
};

// Editar perfil
exports.updateUser = (req, res, next) => {
  const userId = req.user.id;
  const { nombre, telefono } = req.body;
  db.query(
    'UPDATE usuarios SET nombre = ?, telefono = ? WHERE id = ?',
    [nombre, telefono, userId],
    err => {
      if (err) return next(err);
      res.json({ msg: 'Perfil actualizado' });
    }
  );
};

// Listar todos los usuarios (admin)
exports.getAllUsers = (req, res, next) => {
  db.query(
    'SELECT id, nombre, email, tipo, fecha_registro FROM usuarios',
    (err, results) => {
      if (err) return next(err);
      res.json(results);
    }
  );
};

// Eliminar usuario (admin)
exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], err => {
    if (err) return next(err);
    res.json({ msg: 'Usuario eliminado' });
  });
};
