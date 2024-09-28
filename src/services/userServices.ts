import { z } from 'zod';
import { api } from '@/services/api';
import { responseWithError, responseWithSuccess } from '@/utils/apiResponse';
import { loginSchema, registerSchema } from '@/validations/adminSchema';

export async function createUser(payload: z.infer<typeof registerSchema>) {
  try {
    const { data } = await api.post('/users', payload);

    return responseWithSuccess(data, 'Administrador Criado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}

export async function login(payload: z.infer<typeof loginSchema>) {
  try {
    const { data } = await api.post('/login', payload);

    return responseWithSuccess(data, 'Login Efetuado Com Sucesso');
  } catch (err: unknown) {
    return responseWithError(err);
  }
}
