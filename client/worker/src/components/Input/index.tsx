import styles from './styles.module.scss';
// import styles from './input.module.scss';
import Eye from '../../assets/eye.svg';
import EyeClose from '../../assets/close-eye.svg';
import { useState } from 'react';

interface InputProps {
  name: string;
  label?: string;
  type: string;
  error: any;
  eye?: boolean;
  // onBlur?: any;
  // onChange?: any;
  // value?: string;
  placeholder?: string;
  required?: boolean;

  // value: any;
  // onChange: any;
  // error: any;
  // onBlur: any;
}

export function Input({
  name,
  label,
  type,
  placeholder,
  // onBlur,
  // onChange,
  error,
  // value,
  required,
  eye,
}: InputProps) {
  const [isCloseEye, setIsCloseEye] = useState(false);

  return (
    <div className={styles.wrapper}>
      {!!label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      {eye ? (
        <div className={styles.wrapperEye}>
          <input
            id={name}
            name={name}
            type={isCloseEye ? 'text' : type}
            // value={value}
            // onBlur={onBlur}
            // onChange={onChange}
            placeholder={placeholder}
            required={required}
          />

          <button type="button" onClick={() => setIsCloseEye(!isCloseEye)}>
            {!isCloseEye ? <Eye /> : <EyeClose />}
          </button>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      )}

      {!!error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
