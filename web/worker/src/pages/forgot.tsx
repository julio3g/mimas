import Link from 'next/link';
import styles from './forgot.module.scss';
import { Input } from '../components/Input';
import { ButtonSendForm } from '../components/ButtonSendForm';
import { FormEvent, useState } from 'react';
import { api } from '../services/apiClient';

export default function Forgot() {
  const [email, setEmail] = useState('');
  function handleSubmit() {
    api.post('/password/forgot', { email });
  }
  return (
    <div className={`container ${styles.forgot}`}>
      <div className={styles.content}>
        <h2>Recuperar senha</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <ButtonSendForm type="submit">Recuperar</ButtonSendForm>
        </form>
        <Link href="/">
          <a>Voltar</a>
        </Link>
      </div>
    </div>
  );
}
