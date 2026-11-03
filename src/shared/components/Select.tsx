import type { SelectHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import './Input.css';
import './Select.css';

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
  children: ReactNode;
};

export function Select({ label, hint, error, className = '', children, ...rest }: Props) {
  const temErro = Boolean(error);
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <span className={`field__box select__box ${temErro ? 'field__box--error' : ''}`}>
        <select className={`field__input select__input ${className}`} {...rest}>
          {children}
        </select>
        <Icon name="expand_more" size={18} color="var(--text-muted)" />
      </span>
      {(error || hint) && (
        <span className={`field__hint ${temErro ? 'field__hint--error' : ''}`}>{error || hint}</span>
      )}
    </label>
  );
}
