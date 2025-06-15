import { apiFetch } from './api.js';

let stripe;

// Espera que Stripe.js esté cargado en el HTML antes de ejecutar esto
if (window.Stripe) {
  stripe = Stripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // Reemplaza por tu clave pública de Stripe
}

document.addEventListener('DOMContentLoaded', () => {
  const stripeBtn = document.getElementById('pay-with-stripe');
  if (stripeBtn) {
    stripeBtn.addEventListener('click', startStripePayment);
  }
});

async function startStripePayment() {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.length) return alert('Carrito vacío');

    const productos = cart.map(p => ({ id: p.productId, cantidad: p.quantity }));
    const total = cart.reduce((s, p) => s + p.unitPrice * p.quantity, 0);

    const session = await apiFetch('payments/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({ productos, total })
    });

    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    if (result.error) {
      console.error(result.error.message);
      alert('Error al redirigir a Stripe');
    }
  } catch (err) {
    console.error('Error iniciando pago con Stripe:', err);
    alert('No se pudo iniciar el pago');
  }
}
