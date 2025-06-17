import { apiFetch } from './api.js';

const form = document.getElementById('contact-form');
const button = form.querySelector('button[type="submit"]');
const statusDiv = document.getElementById('contact-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (!data.nombre || !data.email || !data.mensaje) {
    showStatus('Por favor, rellena todos los campos.', 'danger');
    return;
  }

  try {
    button.disabled = true;
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Enviando...`;

    const result = await apiFetch('/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (result.ok) {
      showStatus('Tu mensaje ha sido enviado correctamente.', 'success');
      form.reset();
    } else {
      showStatus(result.message || 'Error al enviar el mensaje.', 'danger');
    }
  } catch (err) {
    console.error(err);
    showStatus('Error al conectar con el servidor.', 'danger');
  } finally {
    button.disabled = false;
    button.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Enviar Mensaje`;
  }
});

function showStatus(msg, type = 'info') {
  statusDiv.textContent = msg;
  statusDiv.className = `alert alert-${type}`;
  statusDiv.classList.add('show');

  // Muestra div
  statusDiv.style.display = 'block';

  // Oculta con animación después de 5 segundos
  setTimeout(() => {
    statusDiv.classList.remove('show');
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 500); // Espera a que termine la animación
  }, 5000);
}