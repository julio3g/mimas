import { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/tools').then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <Header />
      <h1>Dashboard {user?.name}</h1>
      <button onClick={signOut}>Sing Out</button>
    </div>
  );
}
// export const getServerSideProps = withSSRAuth(async (ctx) => {
//   const apiClient = setupAPIClient(ctx);
//   const response = await apiClient.get('/users/profile');
//   // console.log(response.data);

//   return {
//     props: {},
//   };
// });
