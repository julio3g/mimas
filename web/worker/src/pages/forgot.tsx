import Head from 'next/head';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { api } from '../services/apiClient';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Form/Button';
import styles from '../styles/pages/forgot.module.scss';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [messageError, setMessageError] = useState('');
  // const email = useForm('E-mail é obrigatório');
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!email.trim()) {
      setMessageError('Email é obrigatório');
    }
    try {
      setLoading(true);
      await api.post('/password/forgot', { email });
      setEmail('');
      setMessageError('Email enviado com sucesso');
    } catch (err) {
      setMessageError('Ocorreu um erro ao enviar o email. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Recuperar Senha - Tool Manager</title>
      </Head>
      <main className={`container ${styles.forgot}`}>
        <div className={styles.content}>
          <h2>Recuperar senha</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="E-mail"
              onChange={({ target }) => setEmail(target.value)}
            />
            <Button type="submit">Recuperar</Button>
          </form>
          <Link href="/">
            <a>Voltar</a>
          </Link>
        </div>
      </main>
    </>
  );
}
