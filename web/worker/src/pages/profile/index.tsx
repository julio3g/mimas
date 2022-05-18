import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const userData = useState('');

  const [dataUser, setDataUser] = useState([]);
  useEffect(() => {
    api
      .get('/users/profile')
      .then((response) => {
        const { name } = response.data;
        setDataUser(name);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <p>{dataUser}</p>
      <button onClick={signOut}>Sing Out</button>
    </div>
  );
}
