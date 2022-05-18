import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { Header } from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/apiClient';
import styles from '../styles/pages/home.module.scss';

export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  useEffect(() => {
    api
      .get('/users/profile')
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>Home - Tool Manager</title>
      </Head>
      <Header />
      <main>
        <h1>home {user?.user}</h1>
        <button onClick={signOut}>Sing Out</button>
      </main>
    </>
  );
}
