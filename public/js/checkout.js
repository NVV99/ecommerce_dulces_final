import { apiFetch } from './api.js';
import { getCart, clearCart } from './cart.js';

// Inicializa Stripe con tu clave pública
const stripe = Stripe('pk_test_51RZkkvPtWxkMlM4xxOQ0gVhrKwsPPt8n7GKv8RSi5kb5FeqKiNK5gTmUTVHwEx2viBLKF4AbO8qUpSNclaZQ3shy00ZeIJWYoH');

function renderProducts() {
  const cart = getCart();
  const ul = document.getElementById('checkout-products-list');
  if (!ul) return;
  ul.innerHTML = cart.map(item => {
    const subtotal = item.unitPrice * item.quantity;
    return `
      <li class="list-group-item d-flex justify-content-between">
        <span>${item.name} × ${item.quantity}</span>
        <span>€${subtotal.toFixed(2)}</span>
      </li>`;
  }).join('');
}

function renderTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  document.getElementById('checkout-subtotal').textContent = subtotal.toFixed(2) + ' €';
  document.getElementById('checkout-total').textContent    = subtotal.toFixed(2) + ' €';
}

async function handlePayment(e) {
  e.preventDefault();

  const form     = document.getElementById('checkoutForm');
  const fullName = form.fullName.value.trim();
  const phone    = form.phone.value.trim();
  const address  = form.address.value.trim();
  const city     = form.city.value.trim();
  const zip      = form.zip.value.trim();
  const country  = form.country.value.trim();
  const cart     = getCart();

  if (!fullName || !phone || !address || !city || !zip || !country || cart.length === 0) {
    return alert('Completa todos los datos y ten productos en el carrito.');
  }

  // Crea pedido + dirección en tu BD
  let orderId;
  try {
    const resp = await apiFetch('/checkout/finalize', {
      method: 'POST',
      body: { fullName, phone, address, city, zip, country, cartItems: cart }
    });
    orderId = resp.orderId;
  } catch (err) {
    console.error('Error al registrar el pedido:', err);
    return alert('No se pudo registrar el pedido. Inténtalo de nuevo.');
  }

  // Prepara las líneas para Stripe
  const lineItems = cart.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: { name: item.name },
      unit_amount: Math.round(item.unitPrice * 100)
    },
    quantity: item.quantity
  }));

  let sessionId;
  try {
    const resp2 = await apiFetch('/checkout/create-checkout-session', {
      method: 'POST',
      body: { orderId, items: lineItems }
    });
    sessionId = resp2.sessionId;
  } catch (err) {
    console.error('Error creando sesión de Stripe:', err);
    return alert('No se pudo iniciar el pago. Inténtalo de nuevo.');
  }

  // Guarda los datos para success.html
  localStorage.setItem('fullName', fullName);
  localStorage.setItem('phone',    phone);
  localStorage.setItem('address',  address);
  localStorage.setItem('city',     city);
  localStorage.setItem('zip',      zip);
  localStorage.setItem('country',  country);

  // Redirige a Stripe Checkout
  const { error } = await stripe.redirectToCheckout({ sessionId });
  if (error) {
    console.error('Stripe redirect error:', error);
    alert(error.message);
  } else {
    clearCart();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderTotals();
  document.getElementById('pay-button').addEventListener('click', handlePayment);
});
