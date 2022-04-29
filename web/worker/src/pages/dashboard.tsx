import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    api.get('users').then((response) => {
      console.log(response);
    });
  }, []);
  return <h1>Dashboard {user?.email}</h1>;
}
