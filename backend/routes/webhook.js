const express = require('express');
const router  = express.Router();
const stripe  = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order   = require('../models/orders');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    try {
      const orderId = session.metadata?.orderId || session.metadata?.order_id || session.client_reference_id;
      if (orderId) {
        await Order.updateOrderStatus(orderId, 'pagado');
      } else {
        console.warn('Order ID not found in session metadata');
      }
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
    console.log('Pago confirmado para session:', session.id);
  }

  res.status(200).end();
});

module.exports = router;
