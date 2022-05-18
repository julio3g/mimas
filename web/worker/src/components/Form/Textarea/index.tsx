import { TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  type: string;
  label?: string;
  error?: string;
}

export function Textarea({ name, type, label, error, ...rest }: IProps) {
  return (
    <div className={styles.wrapper}>
      {!!label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        {...rest}
        name={name}
        className={styles.textarea}
      ></textarea>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
