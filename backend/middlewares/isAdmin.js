module.exports = (req, res, next) => {
  if (req.user && req.user.tipo === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Acceso denegado' });
};
