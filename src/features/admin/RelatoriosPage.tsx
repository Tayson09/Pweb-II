import { PageHeader } from '../../shared/components/PageHeader';
import { StatCard } from '../../shared/components/StatCard';
import { StatusChip } from '../../shared/components/StatusChip';
import { InscricoesPorSituacao, CursosPorSituacao } from './DashboardCharts';
import { TOTAIS, CURSOS_RELATORIO } from '../../shared/data/mocks';
import { dataPorExtenso, horaAtual } from '../../shared/format';
import './dashboard.css';
import './RelatoriosPage.css';

export function RelatoriosPage() {
  return (
    <div>
      <PageHeader title="Relatórios" subtitle={`Gerado em ${dataPorExtenso()} · ${horaAtual()}`} />

      <div className="stat-grid">
        {TOTAIS.map(total => (
          <StatCard
            key={total.label}
            label={total.label}
            value={total.value}
            valueColor={total.accent ? 'var(--accent)' : undefined}
          />
        ))}
      </div>

      <div className="dash-grid" style={{ marginBottom: 16 }}>
        <InscricoesPorSituacao />
        <CursosPorSituacao />
      </div>

      <h3 className="relatorios__titulo">Cursos</h3>
      <div className="relatorios-table-wrap">
        <table className="relatorios-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th className="relatorios-table__num">Inscrições</th>
            </tr>
          </thead>
          <tbody>
            {CURSOS_RELATORIO.map(curso => (
              <tr key={curso.nome}>
                <td>{curso.nome}</td>
                <td><StatusChip status={curso.status} size="sm" /></td>
                <td className="mono relatorios-table__num">{curso.inscricoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
