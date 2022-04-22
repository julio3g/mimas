import Link from 'next/link';
import styles from './forgot.module.scss';
import { Input } from '../components/Input';
import { ButtonSendForm } from '../components/ButtonSendForm';

export default function Forgot() {
  function handleSubmit() {}
  return (
    <div className={`container ${styles.forgot}`}>
      <div className={styles.content}>
        <h2>Recuperar senha</h2>
        <form className={styles.form}>
          <Input type="email" name="email" placeholder="E-mail" />
          <ButtonSendForm type="submit" onClick={handleSubmit}>
            Recuperar
          </ButtonSendForm>
        </form>
        <Link href="/">
          <a>Voltar</a>
        </Link>
      </div>
    </div>
  );
}
