import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import { Header } from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import styles from '../styles/pages/home.module.scss';
import { withSSRAuth } from '../utils/withSSRAuth';

type Tool = {
  id: string;
  name: string;
  brand: string;
  amount: string;
  using: {
    user: {
      name: string;
    };
  };
  toolsImage: {
    image_name: string;
    url: string;
  };
};

export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  const [tools, setTools] = React.useState<Tool[]>([]);
  useEffect(() => {
    api.get<Tool[]>('/tools').then((response) => {
      setTools(response.data);
    });
  }, []);
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
        <button onClick={signOut}>Sing Out</button>
        <section>
          {tools.map((tool) => {
            return (
              <li key={tool.id}>
                <p>{tool.name}</p>
              </li>
            );
          })}
        </section>
      </main>
    </>
  );
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/users/profile');
  // console.log(response.data);

  return {
    props: {},
  };
});
