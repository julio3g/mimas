import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/api';

type User = {
  email: string;
  name: string;
};

type SignInCredentials = {
  email: string;
  password: string;
  phone?: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  useEffect(() => {
    const { mimas_next_access_token: token } = parseCookies();
    if (token) {
      api.get('/users/profile').then((response) => {
        const { email } = response.data;
        setUser(email);
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
      const { token, refresh_token, name } = response.data;
      setCookie(undefined, 'mimas_next_access_token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'mimas_next_refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setUser({ email, name });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      Router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
