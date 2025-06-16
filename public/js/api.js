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

  let body = undefined;
  if (options.body) {
    body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    body
  });

  if (!res.ok) throw new Error('Error en API');
  return await res.json();
}
