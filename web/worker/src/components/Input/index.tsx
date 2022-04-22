import { InputHTMLAttributes, useState } from 'react';
import Eye from '../../assets/eye.svg';
import styles from './styles.module.scss';
import EyeClose from '../../assets/close-eye.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  eye?: boolean;
  type: string;
}

export function Input({ name, label, eye, type, ...rest }: InputProps) {
  const [isCloseEye, setIsCloseEye] = useState(false);
  return (
    <div className={styles.wrapper}>
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
        </div>
      ) : (
        <input id={name} name={name} {...rest} />
      )}
    </div>
  );
}
