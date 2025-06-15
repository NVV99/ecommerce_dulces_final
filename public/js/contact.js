// public/js/contact.js
import { apiFetch } from './api.js';

const form = document.getElementById('contact-form');
form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    nombre:  form.nombre.value.trim(),
    email:   form.email.value.trim(),
    mensaje: form.mensaje.value.trim()
  };

  if (!data.nombre || !data.email || !data.mensaje) {
    return alert('Por favor, rellena todos los campos.');
  }

  try {
    const res = await apiFetch('/contact', {
      method: 'POST',
      body: data
    });
    if (res.ok) {
      alert(res.message || 'Mensaje enviado correctamente.');
      form.reset();
    } else {
      alert(res.message || 'Error enviando el mensaje.');
    }
  } catch (err) {
    console.error(err);
    alert('Error de red al enviar el mensaje.');
  }
});
