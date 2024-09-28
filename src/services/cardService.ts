import { z } from 'zod';
import { api } from '@/services/api';
import { responseWithError, responseWithSuccess } from '@/utils/apiResponse';
import { cardSchema } from '@/validations/cardSchema';

export async function createCard(
  payload: z.infer<typeof cardSchema>,
  token: string,
  clientId: number
) {
  try {
    const { data } = await api.post(`/clients/${clientId}/cards`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cartão Criado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function deleteCard(token: string, clientId: number, cardId: number) {
  try {
    const { data } = await api.delete(`/clients/${clientId}/cards/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Cartão Deletado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}
