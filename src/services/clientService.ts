import { z } from 'zod';
import { api } from '@/services/api';
import { createClientSchema, editClientSchema } from '@/validations/clientSchema';
import { responseWithError, responseWithSuccess } from '@/utils/apiResponse';

export async function createClient(
  payload: z.infer<typeof createClientSchema>,
  token: string
) {
  try {
    const { data } = await api.post('/clients', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cliente Criado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function listClients(token: string) {
  try {
    const { data } = await api.get('/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Listagem de Clientes Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function showClient(token: string, clientId: number) {
  try {
    const { data } = await api.get(`/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cliente Detalhado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function editClient(
  payload: z.infer<typeof editClientSchema>,
  token: string,
  clientId: number
) {
  try {
    const { data } = await api.put(`/clients/${clientId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cliente Criado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function deleteClient(token: string, clientId: number) {
  try {
    const { data } = await api.delete(`/clients/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cliente Deletado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function paginationClients(url: string, token: string) {
  const { pathname, search } = new URL(url);
  let path = `${pathname}${search}`.replace('/api', '');

  try {
    const { data } = await api.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Paginação Feita com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}
