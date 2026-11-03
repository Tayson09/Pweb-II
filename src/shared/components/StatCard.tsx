import { Icon } from './Icon';
import './StatCard.css';

type Props = {
  label: string;
  value: string | number;
  valueColor?: string;
  icon?: string;
  hint?: string;
};

export function StatCard({ label, value, valueColor, icon, hint }: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card__label">
        {icon && <Icon name={icon} size={16} color="var(--text-muted)" />}
        {label}
      </div>
      <div className="stat-card__value" style={{ color: valueColor }}>{value}</div>
      {hint && <div className="stat-card__hint">{hint}</div>}
    </div>
  );
}
