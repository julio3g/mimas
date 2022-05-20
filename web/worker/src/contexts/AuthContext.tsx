import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';

type User = {
  email: string;
  name: string;
  phone: string;
};

type SignInCredentials = {
  email?: string;
  password: string;
  phone?: string;
};
type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthContext = createContext({} as AuthContextData);
let authChannel: BroadcastChannel;
export function signOut() {
  destroyCookie(undefined, 'mimas_next_access_token');
  destroyCookie(undefined, 'mimas_next_refresh_token');
  authChannel.postMessage('signOut');
  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  useEffect(() => {
    authChannel = new BroadcastChannel('auth');
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);
  useEffect(() => {
    const { mimas_next_access_token: token } = parseCookies();
    if (token) {
      api
        .get('/users/profile')
        .then((response) => {
          const { email } = response.data;
          setUser(email);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);
  async function signIn({ email, password, phone }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        phone,
        password,
      });
      const { token, refresh_token, user: newLoggedUser } = response.data;
      setCookie(undefined, 'mimas_next_access_token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'mimas_next_refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setUser(newLoggedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      Router.push('/home');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
