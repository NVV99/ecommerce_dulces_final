import { PRODUCTS } from './data.js';
import { addToCart } from './cart.js';

if (document.body.dataset.section === 'products') {
  document.addEventListener('DOMContentLoaded', () => {
    loadProductsFromURL();
    setupFilterEvents();
  });
}

// Renderiza el listado de productos
function renderProductList(productos) {
  const cont = document.getElementById('productos-container');
  if (!cont) return console.error('No existe #productos-container');

  cont.innerHTML = productos.map(p => {
    const ruta = Array.isArray(p.imagenes) && p.imagenes[0] ? p.imagenes[0] : '';
    const imgTag = ruta ? `<img src="/${ruta}" class="card-img-top" alt="${p.name}">` : '';

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

  cont.querySelectorAll('.view-product-btn').forEach(btn =>
    btn.addEventListener('click', () => showProduct(btn.dataset.id))
  );
  cont.querySelectorAll('.add-to-cart-btn').forEach(btn =>
    btn.addEventListener('click', () =>
      addToCart(btn.dataset.id, btn.dataset.name, parseFloat(btn.dataset.price))
    )
  );
}

// filtrado precio ≤ 0 = sin límite
function aplicarFiltros() {
  const name = document.getElementById('filter-name')?.value.toLowerCase().trim();
  const category = document.getElementById('filter-category')?.value;
  const priceRaw = document.getElementById('filter-price')?.value.trim();

  // Si está vacío → NaN; si es 0/negativo → NaN para ignorar el precio
  let maxPrice = priceRaw === '' ? NaN : parseFloat(priceRaw);
  if (!isNaN(maxPrice) && maxPrice <= 0) maxPrice = NaN;

  const filtered = PRODUCTS.filter(p => {
    const matchName = name ? p.name.toLowerCase().includes(name) : true;
    const matchCat = category === 'todos' ? true : p.category === category;
    const matchPrice = isNaN(maxPrice) ? true : p.price <= maxPrice;
    return matchName && matchCat && matchPrice;
  });

  renderProductList(filtered);
}

// Carga productos según la categoría pasada por URL
function loadProductsFromURL() {
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get('categoria');

  const titulo = document.getElementById('titulo-productos');
  if (titulo && categoria && categoria !== 'todos') {
    const nombre = categoria.charAt(0).toUpperCase() + categoria.slice(1);
    titulo.textContent = `Nuestros ${nombre}`;
  }

  const productosFiltrados =
    categoria && categoria !== 'todos'
      ? PRODUCTS.filter(p => p.category === categoria)
      : PRODUCTS;

  renderProductList(productosFiltrados);
}

// Enlaza el formulario de filtros
function setupFilterEvents() {
  const form = document.getElementById('filter-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      aplicarFiltros();
    });
  }
}

// Mostrar modal de producto
export function showProduct(id) {
  const data = PRODUCTS.find(p => p.id === id);
  if (!data) return console.error('Producto no encontrado:', id);

  document.getElementById('modal-title').textContent = data.name;
  const ruta = (data.imagenes && data.imagenes[0]) || '';
  const modalImg = document.getElementById('modal-img');
  if (ruta) {
    modalImg.src = `/${ruta}`;
    modalImg.style.display = '';
  } else {
    modalImg.style.display = 'none';
  }

  document.getElementById('modal-price').textContent = `€${data.price.toFixed(2)}`;
  document.getElementById('modal-description').textContent = data.description;
  document.getElementById('modal-bio').textContent = data.bio || '';
  document.getElementById('modal-ingredients').textContent =
    (data.ingredientes || []).join(', ');
  document.getElementById('modal-nutrition').textContent = data.valorCalorico
    ? `${data.valorCalorico} kcal`
    : '';

  document.getElementById('quantity-modal').textContent = '1';
  window.__CURRENT_PRODUCT = data;
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById('productModal')
  ).show();
}

// Cantidad desde modal
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
  bootstrap.Modal.getOrCreateInstance(
    document.getElementById('productModal')
  ).hide();
};
