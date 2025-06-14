import { apiFetch } from './api.js';

export async function showOrders() {
  const modalEl   = document.getElementById('ordersModal');
  const modal     = new bootstrap.Modal(modalEl);
  const container = document.getElementById('order-history');

  container.innerHTML = '<p>Cargando pedidos...</p>';

  try {
    const orders = await apiFetch('/orders');



    if (!orders.length) {
      container.innerHTML = '<p>Aún no tienes pedidos registrados.</p>';
    } else {
      container.innerHTML = `
        <ul class="list-group">
          ${orders.map(o => `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Pedido:</strong> ${o.id}<br>
                <strong>Fecha:</strong> ${new Date(o.fecha).toLocaleDateString()}<br>
                <strong>Total:</strong> €${o.total.toFixed(2)}
              </div>
            </li>
          `).join('')}
        </ul>
      `;
    }
  } catch (err) {
    console.error('Error cargando pedidos:', err);
    container.innerHTML = '<p class="text-danger">Error al cargar tus pedidos.</p>';
  }
   modal.show();
}

