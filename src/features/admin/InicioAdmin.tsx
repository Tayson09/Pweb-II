import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { StatCard } from '../../shared/components/StatCard';
import { Button } from '../../shared/components/Button';
import { InscricoesPorSituacao, CursosPorSituacao } from './DashboardCharts';
import { TOTAIS } from '../../shared/data/mocks';
import { dataPorExtenso } from '../../shared/format';
import './dashboard.css';

export function InicioAdmin() {
  const nav = useNavigate();
  return (
    <div>
      <PageHeader
        title="Bom dia, administrador"
        subtitle={dataPorExtenso()}
        action={<Button variant="secondary" rightIcon="bar_chart" onClick={() => nav('/relatorios')}>Ver relatórios</Button>}
      />

      <div className="stat-grid">
        {TOTAIS.map(t => (
          <StatCard key={t.label} label={t.label} value={t.value} valueColor={t.accent ? 'var(--accent)' : undefined} />
        ))}
      </div>

      <div className="dash-grid">
        <InscricoesPorSituacao action={<a href="/relatorios" onClick={e => { e.preventDefault(); nav('/relatorios'); }}>Detalhes</a>} />
        <CursosPorSituacao />
      </div>
    </div>
  );
}
