import type { InputHTMLAttributes } from 'react';
import { Icon } from './Icon';
import './Input.css';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  mono?: boolean;
};

export function Input({ label, hint, error, leftIcon, rightIcon, mono, className = '', ...rest }: Props) {
  const temErro = Boolean(error);
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <span className={`field__box ${temErro ? 'field__box--error' : ''} ${leftIcon ? 'has-left' : ''}`}>
        {leftIcon && <Icon name={leftIcon} size={18} color="var(--text-muted)" />}
        <input className={`field__input ${mono ? 'mono' : ''} ${className}`} {...rest} />
        {rightIcon && <Icon name={rightIcon} size={18} color="var(--text-muted)" />}
      </span>
      {(error || hint) && (
        <span className={`field__hint ${temErro ? 'field__hint--error' : ''}`}>{error || hint}</span>
      )}
    </label>
  );
}
