const BASE_URL = 'http://127.0.0.1:8000/api';
const headers = {
  'Content-Type': 'application/json',
};

export async function authService(path: string, method: string, content: any) {
  return await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(content),
  });
}

export async function apiTokenService(
  path: string,
  method: string,
  token: string | undefined,
  content?: any
) {
  if (method === 'GET' || method === 'DELETE') {
    return await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: content ? JSON.stringify(content) : '',
  });
}
