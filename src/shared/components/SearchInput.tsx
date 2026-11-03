import type { InputHTMLAttributes } from 'react';
import { Icon } from './Icon';
import './SearchInput.css';

type Props = InputHTMLAttributes<HTMLInputElement> & { placeholder?: string };

export function SearchInput({ placeholder = 'Buscar', className = '', ...rest }: Props) {
  return (
    <span className={`search ${className}`}>
      <Icon name="search" size={18} color="var(--text-muted)" />
      <input type="search" placeholder={placeholder} {...rest} />
    </span>
  );
}
