import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'link';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  leftIcon?: string;
  rightIcon?: string;
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
};

export function Button({
  variant = 'primary', size = 'md', leftIcon, rightIcon,
  loading = false, fullWidth = false, disabled, children, className = '', ...rest
}: Props) {
  const classes = [
    'btn', `btn--${variant}`, `btn--${size}`,
    fullWidth ? 'btn--full' : '', className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading && <span className="btn__spinner" />}
      {!loading && leftIcon && <Icon name={leftIcon} size={18} />}
      {children}
      {!loading && rightIcon && <Icon name={rightIcon} size={18} />}
    </button>
  );
}
