import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  useEffect(() => {
    api.get('users').then((response) => {
      console.log(response);
    });
  }, []);
  return (
    <h1>
      Dashboard {user?.email} <button onClick={signOut}>Sing Out</button>
    </h1>
  );
}
export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me');
  // console.log(response.data);

  return {
    props: {},
  };
});
