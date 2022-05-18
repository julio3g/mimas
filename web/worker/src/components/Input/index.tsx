import { InputHTMLAttributes, useState } from 'react';
import Eye from '../../assets/eye.svg';
import styles from './styles.module.scss';
import EyeClose from '../../assets/close-eye.svg';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  eye?: boolean;
  type: string;
  error?: string;
}
export function Input({ name, label, eye, type, error, ...rest }: InputProps) {
  const [isCloseEye, setIsCloseEye] = useState(false);
  return (
    <>
      {!!label && <label htmlFor={name}>{label}</label>}
      {eye ? (
        <div className={styles.wrapperEye}>
          <input
            id={name}
            name={name}
            type={isCloseEye ? 'text' : type}
            {...rest}
          />
          <button type="button" onClick={() => setIsCloseEye(!isCloseEye)}>
            {!isCloseEye ? <Eye /> : <EyeClose />}
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <div className={styles.wrapper}>
          <input id={name} name={name} {...rest} />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
}
