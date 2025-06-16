import { apiFetch } from './api.js';
import { clearCart, getCart } from './cart.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  const orderSummary = document.getElementById('order-summary');
  const rawCart = getCart();

  if (!sessionId || rawCart.length === 0) {
    orderSummary.innerHTML = '<li class="list-group-item">No hay productos en el pedido.</li>';
    return;
  }

  const cartItems = rawCart.map(item => ({
    name: item.name,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  }));

  const total = rawCart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  const fullName = localStorage.getItem('fullName') || 'Cliente';
  const address = localStorage.getItem('address') || 'Dirección no disponible';
  const city = localStorage.getItem('city') || 'Ciudad no disponible';
  const zip = localStorage.getItem('zip') || '00000';
  const phone = localStorage.getItem('phone') || '000000000';

  try {
    const data = await apiFetch('/checkout/finalize', {
      method: 'POST',
      body: {
        fullName,
        address,
        city,
        zip,
        phone,
        total,
        cartItems
      }
    });

    clearCart();

    orderSummary.innerHTML = `
      <li class="list-group-item">
        <strong>Pedido registrado correctamente</strong><br />
        ID de pedido: ${data.orderId}
      </li>
      ${rawCart.map(p => `
        <li class="list-group-item">
          <strong>${p.name}</strong><br />
          Cantidad: ${p.quantity} – Precio: ${p.unitPrice.toFixed(2)} €
        </li>
      `).join('')}
      <li class="list-group-item"><strong>Total:</strong> €${total.toFixed(2)}</li>
    `;
  } catch (err) {
    console.error(err);
    orderSummary.innerHTML = '<p class="text-danger">Error al registrar el pedido. Por favor, contacta con soporte.</p>';
  }
});
