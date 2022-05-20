import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { SideBarProfile } from '../../components/SideBarProfile';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';
import styles from './styles.module.scss'

type UserInfo = {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const [dataUser, setDataUser] = useState<UserInfo>();
  // useEffect(() => {
  //   api
  //     .get('/users/profile')
  //     .then((response) => {
  //       const { name, email, password } = response.data;
  //       setDataUser(name, email, password);
  //     })
  // }, []);

  return (
    <main className={`container ${styles.profile}`}>
      <Header />
      <div>
        <SideBarProfile/>
        <div>
          <h1>{user?.name}</h1>
        </div>
      </div>
      <div>
        <h1>Profile</h1>

        <button onClick={signOut}>Sing Out</button>
      </div>
    </main>
  );
}
