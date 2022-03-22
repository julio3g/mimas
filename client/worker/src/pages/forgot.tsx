import Link from 'next/link';
import styles from './forgot.module.scss';

export default function Forgot() {
  return (
    <div>
      <div className={styles.forgot}></div>
      Teste
      <Link href="/">Voltar</Link>
    </div>
  );
}
