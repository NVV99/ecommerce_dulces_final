// public/js/api.js

export async function apiFetch(path, options = {}) {
  const url = '/api' + path;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  const res = await fetch(url, {
    ...options,
    headers
  });
  return res.json();
}
