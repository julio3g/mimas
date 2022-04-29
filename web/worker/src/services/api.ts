import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'https://api.app.construagil.net.br',
  headers: {
    Authorization: `Bearer ${cookies['nextAuth.token']}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.message === 'Invalid token!') {
        // renovar o token
        cookies = parseCookies();
        const { mimas_next_refresh_token: refreshToken } = cookies;
        api.post('/refresh-token', { refreshToken }).then((response) => {
          const { token } = response.data;
          setCookie(undefined, 'mimas_next_access_token', token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/',
          });
          setCookie(
            undefined,
            'mimas_next_refresh_token',
            response.data.refresh_token,
            {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            },
          );
          api.defaults.headers['Authorization'] = `Bearer ${token}`;
        });
      } else {
        // deslogar o usuário
      }
    }
  },
);
