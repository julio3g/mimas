import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

let isRefreshing = false;
let failedRequestsQueue = [];
export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
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
      if (error.response.status === 400) {
        if (error.response.data?.code === "Refresh Token does't exists!") {
          //Renovando o token.
          cookies = parseCookies(ctx);

          const { 'mimas.refresh_token': refresh_token } = cookies;
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            api
              .post('/refresh', {
                refresh_token,
              })
              .then((response) => {
                const { token } = response.data;

                setCookie(ctx, 'mimas.token', token, {
                  maxAge: 60 * 60 * 24 * 30, //30 dias
                  path: '/',
                });

                setCookie(
                  ctx,
                  'mimas.refresh_token',
                  response.data.refresh_token,
                  {
                    maxAge: 60 * 60 * 24 * 30, //30 dias
                    path: '/',
                  },
                );

                api.defaults.headers['Authorization'] = `Bearer ${token}`;
                failedRequestsQueue.forEach((request) =>
                  request.resolve(token),
                );
                failedRequestsQueue = [];
              })
              .catch((error) => {
                failedRequestsQueue.forEach((request) => request.reject(error));
                failedRequestsQueue = [];

                if (process.browser) signOut();
              })
              .finally(() => {
                isRefreshing = false;
              });
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              resolve: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;
                resolve(api(originalConfig));
              },

              reject: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
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
