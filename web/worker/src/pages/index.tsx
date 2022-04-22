import Head from 'next/head';
import Link from 'next/link';
import styles from './home.module.scss';
import { Input } from '../components/Input';
import Logo from '../../public/assets/logo.svg';
import LogoGoogle from '../assets/logo-g-google.svg';
import LogoFacebook from '../assets/logo-f-facebook.svg';
import { ButtonSendForm } from '../components/ButtonSendForm';

export default function Home() {
  function handleSubmit() {
    console.log('oi');
  }
  return (
    <>
      <Head>
        <title>Login - Tools Controls</title>
      </Head>
      <main className={styles.body}>
        <div className={`container ${styles.content}`}>
          <div className={styles.logo}>
            <div>
              <Logo />
            </div>
            <h1>
              Faça seu login <br /> na plataforma
            </h1>
          </div>
          <form className={styles.form}>
            <section className={styles.wrapperInput}>
              <Input name="email" type="email" placeholder="E-mail" />
              <Input name="password" type="password" placeholder="Senha" eye />
            </section>
            <Link href="/forgot">
              <a>Esqueci minha senha</a>
            </Link>
            <ButtonSendForm type="submit">Entrar</ButtonSendForm>
            <div className={styles.spaceBar}>
              <div>
                <b>Ou</b>
              </div>
            </div>
            <div className={styles.wrapper}>
              <button className={styles.buttonGoogle}>
                <LogoGoogle />
                Google
              </button>
              <button className={styles.buttonFacebook}>
                <LogoFacebook />
                Facebook
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
