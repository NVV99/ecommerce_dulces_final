import { PRODUCTS } from './data.js';
import { addToCart } from './cart.js';

// Solo cargamos en products.html
if (document.body.dataset.section === 'products') {
  document.addEventListener('DOMContentLoaded', loadProducts);
}

export function loadProducts() {
  const productos = PRODUCTS;
  const cont = document.getElementById('productos-container');
  if (!cont) return console.error('No existe #productos-container');

  cont.innerHTML = productos.map(p => {
    // Ruta local si existe
    const ruta = Array.isArray(p.imagenes) && p.imagenes[0] ? p.imagenes[0] : '';
    const imgTag = ruta
      ? `<img src="/${ruta}" class="card-img-top" alt="${p.name}">`
      : '';

    return `
      <div class="col-12 col-sm-6 col-md-4 mb-4 d-flex align-items-stretch">
        <div class="card w-100 h-100">
          ${imgTag}
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">${p.description}</p>
            <p class="mt-auto fw-bold">€${p.price.toFixed(2)}</p>
            <div class="d-grid gap-2">
              <button class="btn btn-outline-secondary view-product-btn" data-id="${p.id}">
                Ver producto
              </button>
              <button class="btn btn-pink add-to-cart-btn"
                      data-id="${p.id}"
                      data-name="${p.name}"
                      data-price="${p.price}">
                <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  // eventos
  cont.querySelectorAll('.view-product-btn').forEach(btn => {
    btn.addEventListener('click', () => showProduct(btn.dataset.id));
  });
  cont.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addToCart(
        btn.dataset.id,
        btn.dataset.name,
        parseFloat(btn.dataset.price)
      );
    });
  });
}

export function showProduct(id) {
  const data = PRODUCTS.find(p => p.id === id);
  if (!data) return console.error('Producto no encontrado:', id);

  // Título
  document.getElementById('modal-title').textContent = data.name;
  // Imagen
  const ruta = (data.imagenes && data.imagenes[0]) || '';
  const modalImg = document.getElementById('modal-img');
  if (ruta) {
    modalImg.src = `/${ruta}`;
    modalImg.style.display = '';
  } else {
    modalImg.style.display = 'none';
  }
  // Precio
  document.getElementById('modal-price').textContent = `€${data.price.toFixed(2)}`;
  // Descripción
  document.getElementById('modal-description').textContent = data.description;
  // Bio, ingredientes y valor calórico
  document.getElementById('modal-bio').textContent = data.bio || '';
  document.getElementById('modal-ingredients').textContent = (data.ingredientes || []).join(', ');
  document.getElementById('modal-nutrition').textContent = data.valorCalorico
    ? `${data.valorCalorico} kcal`
    : '';

  // Reiniciar cantidad y mostrar modal
  document.getElementById('quantity-modal').textContent = '1';
  window.__CURRENT_PRODUCT = data;
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById('productModal')
  ).show();
}

// Controles de cantidad y añadir desde modal
window.increaseQuantity = () => {
  const el = document.getElementById('quantity-modal');
  el.textContent = Number(el.textContent) + 1;
};
window.decreaseQuantity = () => {
  const el = document.getElementById('quantity-modal');
  const n = Number(el.textContent) - 1;
  if (n > 0) el.textContent = n;
};
window.addToCartFromModal = () => {
  const p = window.__CURRENT_PRODUCT;
  if (!p) return;
  const qty = Number(document.getElementById('quantity-modal').textContent);
  addToCart(p.id, p.name, p.price, qty);
  bootstrap.Modal.getOrCreateInstance(document.getElementById('productModal')).hide();
};
