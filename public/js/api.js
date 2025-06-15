import { API_BASE } from './config.js';

export async function apiFetch(path, options = {}) {
  const opts = { ...options };
  opts.headers = opts.headers || {};

  // si body es un objeto, enviarlo como JSON
  if (opts.body && typeof opts.body === 'object') {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(`${API_BASE}${path}`, opts);

  if (res.status === 204) {
    return {};
  }
  return res.json();
}
