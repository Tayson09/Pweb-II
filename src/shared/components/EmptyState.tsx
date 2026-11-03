import type { ReactNode } from 'react';
import { Icon } from './Icon';
import './EmptyState.css';

type Props = {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ icon = 'inbox', title, description, action }: Props) {
  return (
    <div className="empty">
      <Icon name={icon} size={44} color="var(--border-strong)" />
      <p className="empty__title">{title}</p>
      {description && <p className="empty__desc">{description}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  );
}
