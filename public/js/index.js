import { PRODUCTS } from './data.js';
import { addToCart } from './cart.js';
import { showProduct } from './products.js';

// Carrusel de Banners (Bootstrap) 
document.addEventListener("DOMContentLoaded", function () {
  const myCarousel = new bootstrap.Carousel("#carouselExample", {
    interval: 3000, // Tiempo entre slides (ms)
    pause: "hover",
    wrap: true,
  });
});

// Productos Destacados (Swiper)
document.addEventListener("DOMContentLoaded", function () {
  const destacadosContainer = document.getElementById("destacados-container");

  const destacados = PRODUCTS.filter(product => product.featured);

  destacados.forEach(product => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="card h-100 shadow-sm product-card">
        <img src="${product.imagenes && product.imagenes.length ? product.imagenes[0] : ''}" class="card-img-top" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="product-price text-danger fw-bold">${product.price.toFixed(2)} €</p>
          <div class="mt-auto d-grid gap-2">
            <button class="btn btn-outline-secondary view-product-btn" data-id="${product.id}">
              Ver producto
            </button>
            <button class="btn btn-pink add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
              <i class="fa-solid fa-cart-plus"></i> Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    `;
    destacadosContainer.appendChild(slide);

    
    slide.querySelector('.view-product-btn').addEventListener('click', () => {
      showProduct(product.id);
    });
    slide.querySelector('.add-to-cart-btn').addEventListener('click', () => {
      addToCart(product.id, product.name, product.price);
    });
  });

  // Swiper Inicialización
  new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      0: { slidesPerView: 1 },
    },
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});