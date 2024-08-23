'use client';
export default async function fetchData(path: string, method: string, content?: any) {
  const url = `http://127.0.0.1:8000/api${path}`;

  if (method === 'GET' || method === 'DELETE') {
    return await fetch(url, { method });
  }

  return await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: content ? JSON.stringify(content) : '',
  });
}
