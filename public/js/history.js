import { apiFetch } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById("history-body");
  container.innerHTML = '<p>Cargando historial...</p>';

  try {
    const orders = await apiFetch('/orders/mine');

    if (!orders.length) {
      container.innerHTML = '<p>Tu historial está vacío.</p>';
    } else {
      container.innerHTML = `
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td>${o.id}</td>
                <td>${new Date(o.fecha).toLocaleString()}</td>
                <td>€${parseFloat(o.total).toFixed(2)}</td>
                <td>${o.estado}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  } catch (err) {
    console.error('[history.js]', err);
    container.innerHTML = '<p class="text-danger">Error al cargar el historial.</p>';
  }
});
