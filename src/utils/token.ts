import { setCookie, parseCookies, destroyCookie } from 'nookies';

export const saveToken = (userToken: string) => {
  setCookie(null, 'token', userToken, {
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    path: '/',
  });
};

export const getToken = () => {
  const cookies = parseCookies();
  return cookies.token;
};

export const logout = () => {
  destroyCookie(null, 'token');
};
