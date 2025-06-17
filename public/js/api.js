export async function apiFetch(path, options = {}) {
  const url = '/api' + path;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const fetchOpts = {
    ...options,
    headers,
    body: options.body
      ? (typeof options.body === 'string'
          ? options.body
          : JSON.stringify(options.body))
      : undefined
  };

  const res = await fetch(url, fetchOpts);
  if (!res.ok) {
    let msg;
    try {
      const errBody = await res.json();
      msg = errBody.message || errBody.error || JSON.stringify(errBody);
    } catch {
      msg = res.statusText || `Error ${res.status}`;
    }
    throw new Error(msg);
  }
  return await res.json();
}
