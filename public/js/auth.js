import { apiFetch } from './api.js';

window.registerUser = async function() {
  const nombre   = document.getElementById("register-username").value.trim();
  const email    = document.getElementById("register-email").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const confirm  = document.getElementById("register-password-confirm").value.trim();

  // Validaciones cliente
  if (!nombre || nombre.length > 6) {
    return alert("El nombre de usuario debe tener como máximo 6 caracteres.");
  }
  if (!email.includes("@") || !email.includes(".")) {
    return alert("Email inválido.");
  }
  if (password.length < 6) {
    return alert("La contraseña debe tener al menos 6 caracteres.");
  }
  if (password !== confirm) {
    return alert("Las contraseñas no coinciden.");
  }

  // Llamada al backend
  const resp = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nombre, email, password })
  });
  console.log('RESP FRONT register:', resp);

  if (resp.token) {
    // Guardamos token y datos mínimos de user
    const safeUser = {
      id: resp.user.id,
      nombre: resp.user.nombre,
      email: resp.user.email,
      tipo: resp.user.tipo
    };
    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(safeUser));

    // Cerramos modal y actualizamos UI
    bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
    updateUserDisplay();
    return;
  }

  // Mostrar errores de validación
  if (Array.isArray(resp.errors)) {
    return alert(resp.errors.map(e => e.msg).join('\n'));
  }

  // Mensaje genérico
  alert(resp.message || 'Error en registro');
};

window.login = async function() {
  const identifier = document.getElementById("auth-username").value.trim();
  const password   = document.getElementById("auth-password").value.trim();

  if (!identifier || !password) {
    return alert("Usuario/email y contraseña obligatorios.");
  }

  const resp = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ identifier, password })
  });
  console.log('RESP FRONT login:', resp);

  if (resp.token) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(resp.user));
    bootstrap.Modal.getInstance(document.getElementById("authModal")).hide();
    updateUserDisplay();
  } else {
    alert(resp.message || 'Credenciales incorrectas.');
  }
};

window.logout = function() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateUserDisplay();
};

window.updateUserDisplay = function() {
  const container = document.getElementById("user-dropdown-container");
  const user = JSON.parse(localStorage.getItem('user'));
  container.innerHTML = "";

  if (user) {
    container.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
          <i class="fa-solid fa-user"></i> ${user.nombre}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button class="dropdown-item" onclick="showAccount()">Configurar Cuenta</button></li>
          <li><button class="dropdown-item" onclick="showOrders()">Mis Pedidos</button></li>
          <li><button class="dropdown-item" onclick="showHistory()">Historial</button></li>
          <li><hr class="dropdown-divider"></li>
          <li><button class="dropdown-item text-danger" onclick="logout()">Cerrar Sesión</button></li>
        </ul>
      </div>`;
  } else {
    container.innerHTML = `
      <button class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#authModal">
        <i class="fa-solid fa-user"></i>
      </button>`;
  }
};

window.showHistory = () => import('./history.js').then(m => m.showHistory());
window.showOrders  = () => import('./orders.js').then(m => m.showOrders());

document.addEventListener("DOMContentLoaded", updateUserDisplay);
