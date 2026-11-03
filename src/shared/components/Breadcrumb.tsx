import { Link } from 'react-router-dom';
import './Breadcrumb.css';

export type Crumb = { label: string; to?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="breadcrumb__item">
            {c.to && !last
              ? <Link to={c.to}>{c.label}</Link>
              : <span className={last ? 'breadcrumb__current' : ''}>{c.label}</span>}
            {!last && <span className="breadcrumb__sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
