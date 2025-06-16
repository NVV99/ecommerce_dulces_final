const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Para firmar correctamente
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Base de datos
const db = require('../config/db');

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('[Webhook signature error]', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Evento específico: pago completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const pedidoId = session.metadata?.pedidoId;

    if (!pedidoId) {
      console.warn('[Webhook] No se proporcionó pedidoId');
      return res.status(400).json({ message: 'Falta pedidoId en metadata' });
    }

    try {
      await db.query('UPDATE pedidos SET estado = ? WHERE id = ?', ['pagado', pedidoId]);
      console.log(`[Webhook] Pedido ${pedidoId} marcado como pagado.`);
      res.status(200).json({ received: true });
    } catch (error) {
      console.error('[Webhook DB error]', error);
      res.status(500).json({ error: 'Error al actualizar pedido' });
    }
  } else {
    // Evento no manejado
    res.status(200).json({ received: true });
  }
});

module.exports = router;
