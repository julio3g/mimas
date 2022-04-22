import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface buttonSendFormProps {
  type: any;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function ButtonSendForm({
  children,
  onClick,
  type,
  className,
}: buttonSendFormProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${styles.button}`}
    >
      {children}
    </button>
  );
}
