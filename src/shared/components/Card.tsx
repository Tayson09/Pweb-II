import type { ReactNode } from 'react';
import './Card.css';

type Props = {
  title?: string;
  rightAction?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, rightAction, children, className = '' }: Props) {
  return (
    <section className={`card ${className}`}>
      {(title || rightAction) && (
        <header className="card__head">
          {title && <h3 className="card__title">{title}</h3>}
          {rightAction && <div className="card__action">{rightAction}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
