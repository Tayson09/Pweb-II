import type { ReactNode } from 'react';
import { Icon } from './Icon';
import './Banner.css';

type Props = {
  variant?: 'warning' | 'danger' | 'info';
  icon?: string;
  children: ReactNode;
};

const ICONE: Record<string, string> = { warning: 'warning', danger: 'error', info: 'info' };

export function Banner({ variant = 'warning', icon, children }: Props) {
  return (
    <div className={`banner banner--${variant}`}>
      <Icon name={icon ?? ICONE[variant]} size={20} />
      <div className="banner__text">{children}</div>
    </div>
  );
}
