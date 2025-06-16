const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey123';

async function register(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email, password, tipo } = req.body;
  console.log('[REGISTER] email recibido:', email);

  try {
    const existing = await User.findByEmail(email);
    console.log('[REGISTER] findByEmail devolvió:', existing);
    if (existing) {
      return res.status(409).json({ message: 'Este email ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Acepta tipo "admin" si se recibe, por defecto "cliente"
    const tipoFinal = tipo === 'admin' ? 'admin' : 'cliente';

    const user = await User.createUser({
      nombre,
      email,
      password: hashed,
      telefono: null,
      tipo: tipoFinal
    });
    console.log('[REGISTER] usuario creado con id:', user.id);

    const payload = { id: user.id, tipo: user.tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('[REGISTER] error:', err);
    next(err);
  }
}

async function login(req, res, next) {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: 'Usuario/email y contraseña obligatorios.' });
  }

  try {
    let user = await User.findByEmail(identifier);
    if (!user) user = await User.findByUsername(identifier);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }

    const payload = { id: user.id, tipo: user.tipo };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });

    return res.json({ token, user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
