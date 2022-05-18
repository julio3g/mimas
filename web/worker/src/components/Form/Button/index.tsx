import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';
interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}
export function Button({ children, className, ...rest }: IProps) {
  return (
    <button {...rest} className={`${className} ${styles.button}`}>
      {children}
    </button>
  );
}
