import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import decode from 'jwt-decode'
import { AuthTokenError } from '../services/errors/AuthTokenError';
export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['mimas_next_access_token'];
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    // try {
    //   return await fn(ctx);
    // } catch (err) {
    //   if (err instanceof AuthTokenError) {
    //     destroyCookie(ctx, 'mimas_next_access_token');
    //     destroyCookie(ctx, 'mimas_next_refresh_token');
    //     return {
    //       redirect: {
    //         destination: '/',
    //         permanent: false,
    //       },
    //     };
    //   }
    // }
    return await fn(ctx);
  };
}
