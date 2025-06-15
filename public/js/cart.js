// src/js/cart.js

/** Obtiene el carrito desde sessionStorage (no persiste tras cerrar navegador) */
export function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

/** Guarda el carrito en sessionStorage */
export function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartModal();  // refresca la vista del modal si está abierto
}

/** Añade qty al producto; si no existe, lo inserta */
export function addToCart(id, name, price, qty = 1) {
  const cart = getCart();
  const item = cart.find(x => x.productId === id);
  if (item) {
    item.quantity += qty;
    // actualiza nombre/precio por si cambian
    item.name = name;
    item.unitPrice = price;
  } else {
    cart.push({ productId: id, name, unitPrice: price, quantity: qty });
  }
  saveCart(cart);
}

/** Elimina completamente un producto del carrito */
export function removeFromCart(id) {
  const cart = getCart().filter(x => x.productId !== id);
  saveCart(cart);
}
window.removeFromCart = removeFromCart;  // expuesto para onclick

/** Vacía todo el carrito */
export function clearCart() {
  saveCart([]);
}

/** Calcula el total de unidades en el carrito */
export function getCartCount() {
  return getCart().reduce((sum, x) => sum + x.quantity, 0);
}

/** Actualiza todos los badges #cart-count */
export function updateCartCount() {
  const count = getCartCount();
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
  });
}

/** Rellena la tabla del modal con las filas del carrito */
export function loadCartModal() {
  const cart = getCart();
  const body = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');

  body.innerHTML = cart.map(i => `
    <tr>
      <td>${i.name}</td>
      <td>${i.quantity}</td>
      <td>€${(i.unitPrice || 0).toFixed(2)}</td>
      <td>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart('${i.productId}')">&times;</button>
      </td>
    </tr>
  `).join('');

  const total = cart.reduce((sum, x) => sum + (x.unitPrice || 0) * x.quantity, 0);
  totalEl.textContent = total.toFixed(2);
}

/** Al hacer checkout, redirige a la página de pago */
export function checkout() {
  window.location.href = 'checkout.html';
}
window.checkout = checkout;

// Inicialización al cargar la página:
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadCartModal();
});
