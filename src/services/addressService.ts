import { z } from 'zod';
import { api } from '@/services/api';
import { responseWithError, responseWithSuccess } from '@/utils/apiResponse';
import { addressSchema } from '@/validations/adressSchema';

export async function createAddress(
  payload: z.infer<typeof addressSchema>,
  token: string,
  clientId: number
) {
  try {
    const { data } = await api.post(`/clients/${clientId}/addresses`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Endereço Criado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function deleteAddress(token: string, clientId: number, addressId: number) {
  try {
    const { data } = await api.delete(`/clients/${clientId}/addresses/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseWithSuccess(data, 'Endereço Deletado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}
