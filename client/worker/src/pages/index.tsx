import Head from 'next/head';
import styles from './home.module.scss';
import Logo from '../../public/assets/logo.svg';
import LogoFacebook from '../assets/logo-f-facebook.svg';
import LogoGoogle from '../assets/logo-g-google.svg';
import Link from 'next/link';
import { Input } from '../components/Input';

export default function Home() {
  return (
    <main className={styles.body}>
      <Head>
        <title>Login - Tools Controls</title>
      </Head>
      <div className={`container ${styles.content}`}>
        <div>
          <Logo />
          <h1>Faça seu login na plataforma</h1>
        </div>
        <form className={styles.form}>
          {/* <div className={styles.}></div> */}
          <section className={styles.wrapperInput}>
            <Input name="email" type="email" placeholder="E-mail" error="" />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              error=""
              eye
            />
          </section>
          <Link href="/forgot">
            <a className={styles.forgot}>Esqueci minha senha</a>
          </Link>
          <button type="submit" className={styles.buttonForm}>
            Entrar
          </button>
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
  );
}
