const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middlewares/authMiddleware');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/create-checkout-session', authMiddleware, async (req, res) => {
  try {
    const { orderId, items } = req.body;

    if (!orderId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Pedido inválido.' });
    }

    if (!process.env.FRONTEND_URL) {
      console.error('FRONTEND_URL no configurado');
      return res.status(500).json({ message: 'Error interno: FRONTEND_URL no configurado' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel.html`,
      metadata: { orderId: orderId.toString() }
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(' [create-checkout-session error]', err);
    res.status(500).json({ message: err.message || 'Error interno al crear sesión de pago.' });
  }
});

router.post('/finalize', authMiddleware, checkoutController.finalizeOrder);

module.exports = router;
