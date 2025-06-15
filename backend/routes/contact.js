const express    = require('express');
const router     = express.Router();
const Contact    = require('../models/contactMessage');
const nodemailer = require('nodemailer');

// Configuración de Nodemailer con tus env vars
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE === 'true',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// POST /api/contact
router.post('/', async (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  const { nombre, email, mensaje } = req.body;

  if (!userId && (!nombre || !email || !mensaje)) {
    return res.status(400).json({ ok:false, message:'Faltan campos obligatorios.' });
  }

  try {
    // 1) Guarda en la DB
    await Contact.createMessage({ userId, nombre, email, mensaje });
  } catch (dbErr) {
    return next(dbErr);
  }

  // 2) Envía email sin bloquear la respuesta
  (async () => {
    try {
      await transporter.sendMail({
        from: `"Sakura Suki" <${process.env.MAIL_USER}>`,
        to: process.env.CONTACT_NOTIFY_EMAIL,
        subject: `Nuevo mensaje de ${nombre}`,
        text:   `De: ${nombre} <${email}>\n\n${mensaje}`,
        html:   `<p><strong>De:</strong> ${nombre} &lt;${email}&gt;</p>
                 <p><strong>Mensaje:</strong></p>
                 <blockquote>${mensaje.replace(/\n/g,'<br>')}</blockquote>`
      });
    } catch (mailErr) {
      console.error('Error enviando email de notificación:', mailErr);
    }
  })();

  // 3) Responde inmediatamente
  res.status(201).json({ ok:true, message:'Mensaje recibido. ¡Gracias!' });
});

module.exports = router;
