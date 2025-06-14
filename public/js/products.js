import { apiFetch } from './api.js';
import { addToCart } from './cart.js'; 

// 1) Ver que el módulo se carga
console.log('products.js module loaded');

// 2) Comprueba el dataset del body
console.log('Body data-section:', document.body.dataset.section);

// Espera a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  if (document.body.dataset.section === 'products') {
    console.log('Section is "products", calling loadProducts()');
    loadProducts();
  } else {
    console.log('Not on products page, section =', document.body.dataset.section);
  }
});

// 3) Función para cargar productos
export async function loadProducts() {
  console.log('loadProducts() started');
  try {
    const productos = await apiFetch('/products');
    console.log('API returned productos:', productos);

    const cont = document.getElementById("productos-container");
    if (!cont) {
      console.error('No existe el elemento #productos-container');
      return;
    }

    // Mapea y convierte precio a número
      const html = productos.map(p => {
        const priceNum = parseFloat(p.precio);
        return `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">${p.descripcion}</p>
              <p class="mt-auto fw-bold">€${priceNum.toFixed(2)}</p>
               <div class="d-grid gap-2">
                <button class="btn btn-outline-secondary view-product-btn" data-product-id="${p.id}">Ver producto</button>
                <button class="btn btn-pink add-to-cart-btn" data-product-id="${p.id}" data-name="${p.nombre}" data-price="${priceNum}">
                  <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
                </button>
              </div>
          </div>
        </div>
      `;
      }).join('');

    console.log('Generated HTML for cards, injecting into container');
    cont.innerHTML = html;
    
    // Añadir evento a cada botón de añadir al carrito
     cont.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const productId = Number(btn.getAttribute('data-product-id'));
          const price = parseFloat(btn.getAttribute('data-price'));
          const name  = btn.getAttribute('data-name');
          addToCart(productId, name, price);
        });
      });

      cont.querySelectorAll('.view-product-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-product-id');
          showProduct(id);
        });
      });
  } catch (err) {
    console.error('Error dentro de loadProducts():', err);
  }
}

let currentProduct = null;

export async function showProduct(id){
  try{
    const data = await apiFetch(`/products/${id}`);
    currentProduct = data;
    document.getElementById('modal-title').textContent = data.nombre;
    document.getElementById('modal-img').src = data.imagen;
    document.getElementById('modal-description').textContent = data.descripcion || '';
    document.getElementById('modal-price').textContent = `€${parseFloat(data.precio).toFixed(2)}`;
    document.getElementById('quantity-modal').textContent = '1';
    bootstrap.Modal.getOrCreateInstance(document.getElementById('productModal')).show();
  }catch(err){
    console.error('Error loading product', err);
  }
}

window.increaseQuantity = function(){
  const el = document.getElementById('quantity-modal');
  el.textContent = Number(el.textContent)+1;
};

window.decreaseQuantity = function(){
  const el = document.getElementById('quantity-modal');
  const n = Number(el.textContent)-1;
  if(n>0) el.textContent = n;
};

window.addToCartFromModal = function(){
  if(!currentProduct) return;
  const qty = Number(document.getElementById('quantity-modal').textContent);
  addToCart(currentProduct.id, currentProduct.nombre, parseFloat(currentProduct.precio), qty);
  bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
}
