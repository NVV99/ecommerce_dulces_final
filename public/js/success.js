import { getCart, clearCart } from './cart.js';

const cart = getCart();
const orderSummary = document.getElementById('order-summary');

if (cart.length === 0) {
  orderSummary.innerHTML = '<li class="list-group-item">No hay productos en el pedido.</li>';
} else {
  cart.forEach(product => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <strong>${product.name}</strong><br>
      Cantidad: ${product.quantity} – Precio: ${product.unitPrice} €
    `;
    orderSummary.appendChild(li);
  });
}

clearCart();
