// public/js/cart.js

/** Obtiene el carrito desde sessionStorage */
export function getCart() {
  return JSON.parse(sessionStorage.getItem('cart') || '[]');
}

/** Guarda el carrito y refresca badge/modal si existen */
export function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartModal();
}

/** Añade qty al producto, o lo crea */
export function addToCart(id, name, price, qty = 1) {
  const cart = getCart();
  const item = cart.find(x => x.productId === id);
  if (item) {
    item.quantity += qty;
    item.name = name;
    item.unitPrice = price;
  } else {
    cart.push({ productId: id, name, unitPrice: price, quantity: qty });
  }
  saveCart(cart);
}

/** Quita un producto */
export function removeFromCart(id) {
  const cart = getCart().filter(x => x.productId !== id);
  saveCart(cart);
}
window.removeFromCart = removeFromCart;

/** Vacía todo el carrito */
export function clearCart() {
  saveCart([]);
}

/** Cuenta total de unidades */
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

/** Rellena el modal del carrito si existe */
export function loadCartModal() {
  const body = document.getElementById('cart-items');
  if (!body) return;           // evita error en páginas sin modal
  const totalEl = document.getElementById('cart-total');

  const cart = getCart();
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

/** Redirige a checkout.html */
export function checkout() {
  window.location.href = 'checkout.html';
}
window.checkout = checkout;

/** Al cargar la página, actualiza badge y modal */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  loadCartModal();
});
