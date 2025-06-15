import { apiFetch } from './api.js';

window.sendContact = async function(e) {
  e.preventDefault();
  const f = e.target;
  const data = {
    nombre:  f.name?.value || '',
    email:   f.email?.value || '',
    mensaje: f.message.value
  };
  const resp = await apiFetch('/contact', { method:'POST', body: JSON.stringify(data) });
  alert(resp.message);
};
