import { apiFetch } from './api.js';
import { getCart, clearCart } from './cart.js';

// Inicia Stripe con clave pública
const stripe = Stripe('pk_test_51RZkkvPtWxkMlM4xxOQ0gVhrKwsPPt8n7GKv8RSi5kb5FeqKiNK5gTmUTVHwEx2viBLKF4AbO8qUpSNclaZQ3shy00ZeIJWYoH');

// Renderiza los productos en el checkout
function renderProducts() {
  const cart = getCart();
  const ul = document.getElementById('checkout-products-list');
  if (!ul || !cart || cart.length === 0) return;

  ul.innerHTML = '';
  cart.forEach(item => {
    const subtotal = (item.unitPrice || 0) * item.quantity;
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between';
    li.innerHTML = `<span>${item.name} × ${item.quantity}</span><span>€${subtotal.toFixed(2)}</span>`;
    ul.appendChild(li);
  });
}

// Renderiza los totales
function renderTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);
  document.getElementById('checkout-subtotal').textContent = subtotal.toFixed(2) + ' €';
  document.getElementById('checkout-total').textContent = subtotal.toFixed(2) + ' €';
}

// Manejador del pago
async function handlePayment() {
  const cart = getCart();
  if (!cart || cart.length === 0) {
    return alert('Tu carrito está vacío');
  }

  const fullName = document.getElementById('fullName').value.trim();
  const address  = document.getElementById('address').value.trim();
  const city     = document.getElementById('city').value.trim();
  const zip      = document.getElementById('zip').value.trim();
  const phone    = document.getElementById('phone').value.trim();

  if (!fullName || !address || !city || !zip || !phone) {
    return alert('Completa todos los datos de envío.');
  }

  const total = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const orderResp = await apiFetch('/checkout/finalize', {
    method: 'POST',
    body: {
      fullName,
      address,
      city,
      zip,
      phone,
      total,
      cartItems: cart
    }
  });

  if (!orderResp.orderId) {
    return alert(orderResp.message || 'Error al registrar el pedido');
  }

  const lineItems = cart.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: { name: item.name },
      unit_amount: Math.round(item.unitPrice * 100),
    },
    quantity: item.quantity
  }));

  const checkoutResp = await apiFetch('/checkout/create-checkout-session', {
    method: 'POST',
    body: {
      orderId: orderResp.orderId,
      items: lineItems
    }
  });

  if (!checkoutResp.sessionId) {
    return alert(checkoutResp.message || 'Error al iniciar el pago');
  }

  const { error } = await stripe.redirectToCheckout({ sessionId: checkoutResp.sessionId });
  if (error) {
    console.error('Stripe redirect error:', error);
    alert(error.message);
  } else {
    clearCart();
  }
}

// DOM al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderTotals();

  const btn = document.getElementById('pay-button');
  if (btn) {
    btn.addEventListener('click', handlePayment);
  }
});
