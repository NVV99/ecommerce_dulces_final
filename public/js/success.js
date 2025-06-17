import { clearCart, getCart } from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');

  const orderSummary = document.getElementById('order-summary');
  const rawCart = getCart();

  // Si no hay sessionId o el carrito está vacío, mensaje
  if (!sessionId || rawCart.length === 0) {
    orderSummary.innerHTML = '<li class="list-group-item">No hay productos en el pedido.</li>';
    return;
  }

  // Recupera datos del usuario que guardaste en el checkout, si los almacenaste
  const fullName = localStorage.getItem('fullName') || 'Cliente';
  const address  = localStorage.getItem('address')  || 'Dirección no disponible';
  const city     = localStorage.getItem('city')     || 'Ciudad no disponible';
  const zip      = localStorage.getItem('zip')      || '00000';
  const phone    = localStorage.getItem('phone')    || '000000000';

  // Calcula total
  const total = rawCart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  // Borra el carrito y los datos de envío
  clearCart();
  localStorage.removeItem('fullName');
  localStorage.removeItem('address');
  localStorage.removeItem('city');
  localStorage.removeItem('zip');
  localStorage.removeItem('phone');

  // Renderiza el resumen
  orderSummary.innerHTML = `
    <li class="list-group-item">
      <strong>Gracias por tu compra, ${fullName}!</strong><br>
      Tu pedido está en proceso. (Session ID: ${sessionId})
    </li>
    <li class="list-group-item">
      <strong>Dirección de envío:</strong><br>
      ${address}, ${city}, CP ${zip}<br>
      Tel: ${phone}
    </li>
    ${rawCart.map(p => `
      <li class="list-group-item">
        <strong>${p.name}</strong><br>
        Cantidad: ${p.quantity} – Precio u.: €${p.unitPrice.toFixed(2)}
      </li>
    `).join('')}
    <li class="list-group-item">
      <strong>Total pagado:</strong> €${total.toFixed(2)}
    </li>
  `;
});
