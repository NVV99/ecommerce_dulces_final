export function getCart() { return JSON.parse(localStorage.getItem('cart')||'[]'); }
export function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
export function addToCart(id, name, price, qty = 1){
  const c = getCart();
  const it = c.find(x=>x.productId===id);
  if(it){
    it.quantity += qty;
    if(price) it.unitPrice = price;
    if(name)  it.name = name;
  } else {
    c.push({productId:id, name, unitPrice:price, quantity:qty});
  }
  saveCart(c);
  const totalQty = c.reduce((s,x)=>s+x.quantity,0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = totalQty);
}
export function loadCartModal(){
  const c = getCart(), body=document.getElementById('cart-items'), totEl=document.getElementById('cart-total');
  body.innerHTML = c.map(i=>`
    <tr>
      <td>${i.name || 'Producto '+i.productId}</td>
      <td>${i.quantity}</td>
      <td>€${(i.unitPrice||0).toFixed(2)}</td>
      <td><button class="btn btn-sm btn-danger" onclick="removeFromCart(${i.productId})">&times;</button></td>
    </tr>
  `).join('');
  totEl.textContent = c.reduce((s,x)=>(x.unitPrice||0)*x.quantity+s,0).toFixed(2);
}

export function removeFromCart(id){
  const c = getCart().filter(x => x.productId !== id);
  saveCart(c);
  const totalQty = c.reduce((s,x)=>s+x.quantity,0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = totalQty);
  loadCartModal();
}
window.removeFromCart = removeFromCart;

export function checkout(){
  // Puedes llamar a submitOrder() de checkout.js o redirigir a checkout.html
  window.location.href = 'checkout.html';
}
window.checkout = checkout;
document.addEventListener("DOMContentLoaded", loadCartModal);