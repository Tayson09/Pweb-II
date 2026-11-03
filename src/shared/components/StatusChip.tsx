import { Icon } from './Icon';
import type { CourseStatus, EnrollmentStatus } from '../data/domain.store';
import './StatusChip.css';

type AnyStatus = CourseStatus | EnrollmentStatus;

const MAP: Record<AnyStatus, { label: string; icon: string; fg: string; bg: string }> = {
  PENDENTE:  { label: 'Pendente',     icon: 'schedule',     fg: 'var(--status-pending)',  bg: 'var(--status-pending-bg)' },
  DEFERIDA:  { label: 'Deferida',     icon: 'check_circle', fg: 'var(--status-deferred)', bg: 'var(--status-deferred-bg)' },
  INDEFERIDA:{ label: 'Indeferida',   icon: 'cancel',       fg: 'var(--status-denied)',   bg: 'var(--status-denied-bg)' },
  CANCELADA: { label: 'Cancelada',    icon: 'block',        fg: 'var(--status-canceled)', bg: 'var(--status-canceled-bg)' },
  ANALISE:   { label: 'Em análise',   icon: 'schedule',     fg: 'var(--status-analysis)', bg: 'var(--status-analysis-bg)' },
  ANDAMENTO: { label: 'Em andamento', icon: 'play_circle',  fg: 'var(--status-running)',  bg: 'var(--status-running-bg)' },
  CONCLUIDO: { label: 'Concluído',    icon: 'task_alt',     fg: 'var(--status-done)',     bg: 'var(--status-done-bg)' },
  FECHADO:   { label: 'Fechado',      icon: 'lock',         fg: 'var(--status-closed)',   bg: 'var(--status-closed-bg)' },
};

export function StatusChip({ status, size = 'md' }: { status: AnyStatus; size?: 'sm' | 'md' }) {
  const s = MAP[status];
  return (
    <span className={`status-chip status-chip--${size}`} style={{ color: s.fg, background: s.bg }}>
      <Icon name={s.icon} size={size === 'sm' ? 14 : 16} color={s.fg} />
      {s.label}
    </span>
  );
}
