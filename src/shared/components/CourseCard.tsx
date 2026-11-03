import { useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import { StatusChip } from './StatusChip';
import type { Curso } from '../data/domain.store';
import './CourseCard.css';

export function CourseCard({ curso }: { curso: Curso }) {
  const nav = useNavigate();
  const lotado = curso.ocupadas >= curso.vagas;
  const pct = curso.vagas ? Math.min(100, Math.round((curso.ocupadas / curso.vagas) * 100)) : 0;

  return (
    <button className="course-card" onClick={() => nav(`/cursos/${curso.id}`)}>
      <div className="course-card__cover">
        <span className="course-card__ini">{curso.iniciais}</span>
        <span className="course-card__chip"><StatusChip status={curso.status} size="sm" /></span>
      </div>
      <div className="course-card__body">
        <p className="course-card__name">{curso.nome}</p>
        <p className="course-card__inst">{curso.instituicao}</p>
        <div className="course-card__meta">
          <span><Icon name="date_range" size={14} color="var(--text-muted)" />{curso.periodoIni} – {curso.periodoFim}</span>
          <span><Icon name="schedule" size={14} color="var(--text-muted)" />{curso.horarioIni}–{curso.horarioFim}</span>
          <span><Icon name="timer" size={14} color="var(--text-muted)" />{curso.cargaHoraria} h</span>
        </div>
        <div className="course-card__bar">
          <span style={{ width: `${pct}%`, background: lotado ? 'var(--text-muted)' : 'var(--accent)' }} />
        </div>
        <p className="course-card__vagas">Vagas {curso.ocupadas}/{curso.vagas}{lotado ? ' · lotado' : ''}</p>
      </div>
    </button>
  );
}
