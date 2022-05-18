import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    // baseURL: 'https://api.app.construagil.net.br',
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['mimas_next_access_token']}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      console.log(error.code);
      if (error.response.status === 401) {
        if (error.response.data?.message === 'Invalid token!') {
          // // renovar o token
          cookies = parseCookies();
          const { mimas_next_refresh_token: refreshToken } = cookies;
          const originalConfig = error.config;
          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post('/refresh-token', { token: refreshToken })
              .then((response) => {
                const { token } = response.data;
                setCookie(ctx, 'mimas_next_access_token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                });
                setCookie(
                  ctx,
                  'mimas_next_refresh_token',
                  response.data.refresh_token,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/',
                  },
                );
                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token),
                );
                failedRequestsQueue = [];
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) =>
                  request.OnFailure(err),
                );
                failedRequestsQueue = [];
                if (process.browser) signOut();
              })
              .finally(() => (isRefreshing = false));
          }
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              OnFailure: (err: AxiosError) => reject(err),
            });
          });
        } else {
          // deslogar o usuário
          if (process.browser) signOut();
          else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }
      return Promise.reject(error);
    },
  );
  return api;
}
