import { apiFetch } from './api.js';

// Carga panel de administración al abrir el modal
window.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('adminModal');
  if (!modalEl) return;

  modalEl.addEventListener('show.bs.modal', () => {
    loadAdminUsers();
    loadAdminOrders();
  });
});

// Carga usuarios
async function loadAdminUsers() {
  const container = document.getElementById('admin-users');
  if (!container) return;

  try {
    const users = await apiFetch('/users');
    if (!Array.isArray(users)) throw new Error('Formato inválido');

    container.innerHTML = `
      <h5><i class="fa-solid fa-users"></i> Usuarios</h5>
      <table class="table table-striped">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Tipo</th></tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>${u.id}</td>
              <td>${u.nombre}</td>
              <td>${u.email}</td>
              <td>${u.tipo}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.error('[Admin Users Error]', err);
    container.innerHTML = `<p class="text-danger">Error al cargar los usuarios.</p>`;
  }
}

// Carga pedidos
async function loadAdminOrders() {
  const container = document.getElementById('admin-orders');
  if (!container) return;

  try {
    const orders = await apiFetch('/orders');
    if (!Array.isArray(orders)) throw new Error('Formato inválido');

    container.innerHTML = `
      <h5><i class="fa-solid fa-box"></i> Pedidos</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr>
              <td>${o.id}</td>
              <td>${o.cliente}</td>
              <td>${new Date(o.fecha).toLocaleString()}</td>
              <td>€${parseFloat(o.total).toFixed(2)}</td>
              <td>${o.estado}</td>
              <td>
                <button class="btn btn-sm btn-success" onclick="updateOrderStatus(${o.id}, 'pagado')">Marcar Pagado</button>
                <button class="btn btn-sm btn-warning" onclick="updateOrderStatus(${o.id}, 'enviado')">Marcar Enviado</button>
                <button class="btn btn-sm btn-danger" onclick="updateOrderStatus(${o.id}, 'cancelado')">Cancelar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.error('[Admin Orders Error]', err);
    container.innerHTML = `<p class="text-danger">Error al cargar los pedidos.</p>`;
  }
}

// Cambia estado del pedido
window.updateOrderStatus = async function (orderId, estado) {
  if (!confirm(`¿Confirmas cambiar el estado a "${estado}"?`)) return;
  try {
    const resp = await apiFetch(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ estado }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert(resp.message || 'Estado actualizado');
    loadAdminOrders(); // refresca
  } catch (err) {
    console.error('[Update Estado Error]', err);
    alert('Error al actualizar estado');
  }
};
