const db = require('../config/db');

// Perfil de usuario
exports.getUserProfile = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const [results] = await db.query(
      'SELECT id, nombre, email, telefono, tipo, fecha_registro FROM usuarios WHERE id = ?',
      [userId]
    );
    res.json(results[0]);
  } catch (err) {
    next(err);
  }
};

// Editar perfil
exports.updateUser = async (req, res, next) => {
  const userId = req.user.id;
  const { nombre, telefono } = req.body;
  try {
    await db.query(
      'UPDATE usuarios SET nombre = ?, telefono = ? WHERE id = ?',
      [nombre, telefono, userId]
    );
    res.json({ msg: 'Perfil actualizado' });
  } catch (err) {
    next(err);
  }
};

// Listar todos los usuarios (admin)
exports.getAllUsers = async (req, res, next) => {
  try {
    const [results] = await db.query(
      'SELECT id, nombre, email, tipo, fecha_registro FROM usuarios'
    );
    res.json(results);
  } catch (err) {
    next(err);
  }
};

// Eliminar usuario (admin)
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
    res.json({ msg: 'Usuario eliminado' });
  } catch (err) {
    next(err);
  }
};
