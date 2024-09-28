import { ResponseError } from '@/interfaces/errorInterface';

export function responseWithError(err: any) {
  const apiError = {
    mensagem: err.response.data.error,
  };

  return {
    ok: false,
    message: {
      title: 'Erro',
      description: JSON.stringify(apiError),
    },
    data: null,
  };
}

export function responseWithSuccess(data: any, message: any) {
  return {
    ok: true,
    message: {
      title: 'Success',
      description: message,
    },
    data,
  };
}
