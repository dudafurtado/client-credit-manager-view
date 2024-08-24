'use client';
import { ResponseError } from '@/interfaces/errorInterface';
import { apiTokenService, authService } from './api';

export async function fetchData(
  type: 'auth' | 'api',
  path: string,
  method: string,
  message: string,
  values?: any,
  token?: string
) {
  try {
    let res: any;

    if (type === 'auth') {
      res = await authService(path, method, values);
    } else {
      res = await apiTokenService(path, method, token, values);
    }

    if (!res.ok) {
      const { errors, message } = await res.json();
      const validationError = JSON.stringify(errors, null, 2);
      const apiError = message || `${res.statusText} | ${res.type}`;

      return {
        ok: false,
        message: {
          title: 'Error',
          description: errors ? validationError : apiError,
        },
      };
    }

    const data = await res.json();

    return {
      ok: true,
      message: {
        title: 'Success',
        description: message,
      },
      data,
    };
  } catch (err: unknown) {
    const error = err as ResponseError;
    return {
      ok: false,
      message: {
        title: 'Error',
        description: error.message,
      },
    };
  }
}
