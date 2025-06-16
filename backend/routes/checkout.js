// backend/routes/checkout.js

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/create-checkout-session',
  authMiddleware,
  async (req, res) => {
    try {
      const { orderId, items } = req.body;

      // Validación básica
      if (!orderId || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Pedido inválido.' });
      }

      // Aquí items ya viene formateado desde el frontend:
      // [{ price_data: {... unit_amount, currency, product_data }, quantity }, ...]
      const line_items = items;

      // Comprueba FRONTEND_URL en .env
      if (!process.env.FRONTEND_URL) {
        console.error('FRONTEND_URL no configurado');
        return res.status(500).json({ message: 'Error interno: FRONTEND_URL no configurado' });
      }

      // Creamos la sesión en Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:  `${process.env.FRONTEND_URL}/cancel.html`,
        metadata: { orderId: orderId.toString() }
      });

      // Enviamos el sessionId al frontend
      res.json({ sessionId: session.id });
    } catch (err) {
      console.error(' [create-checkout-session error]', err);
      res.status(500).json({ message: err.message || 'Error interno al crear sesión de pago.' });
    }
  }
);

module.exports = router;
