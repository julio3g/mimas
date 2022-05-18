import { InputHTMLAttributes, useState } from 'react';
import Eye from '../../../assets/eye.svg';
import styles from './styles.module.scss';
import CloseEye from '../../../assets/close-eye.svg';

interface IPros extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  eye?: boolean;
  label?: string;
  error?: string;
}

export function Input({ name, type, eye, label, error, ...rest }: IPros) {
  const [isCloseEye, setIsCloseEye] = useState(false);
  return (
    <>
      {eye ? (
        <div className={styles.wrapper}>
          <div>
            <input
              id={name}
              {...rest}
              name={name}
              className={styles.input}
              type={isCloseEye ? 'text' : type}
            />
            <button type="button" onClick={() => setIsCloseEye(!isCloseEye)}>
              {!isCloseEye ? <Eye /> : <CloseEye />}
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <div className={styles.wrapper}>
          {!!label && <label htmlFor={name}>{label}</label>}
          <input type={type} name={name} {...rest} className={styles.input} />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
}
