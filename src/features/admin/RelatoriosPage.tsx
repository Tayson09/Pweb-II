import { Button } from '../../shared/components/Button';
import { PageHeader } from '../../shared/components/PageHeader';
import { StatCard } from '../../shared/components/StatCard';
import { StatusChip } from '../../shared/components/StatusChip';
import { InscricoesPorSituacao, CursosPorSituacao } from './DashboardCharts';
import { TOTAIS, CURSOS_RELATORIO } from '../../shared/data/mocks';
import { dataPorExtenso, horaAtual } from '../../shared/format';
import './dashboard.css';
import './RelatoriosPage.css';

const STATUS_LABEL: Record<string, string> = {
  ANALISE: 'Em análise',
  ANDAMENTO: 'Em andamento',
  CONCLUIDO: 'Concluído',
  FECHADO: 'Fechado',
};

function exportarCsv() {
  const linhas: string[][] = [];
  linhas.push(['Relatório DEPPI', `${dataPorExtenso()} ${horaAtual()}`]);
  linhas.push([]);
  linhas.push(['Indicador', 'Valor']);
  TOTAIS.forEach(total => linhas.push([total.label, total.value]));
  linhas.push([]);
  linhas.push(['Curso', 'Status', 'Inscrições']);
  CURSOS_RELATORIO.forEach(curso =>
    linhas.push([curso.nome, STATUS_LABEL[curso.status] ?? curso.status, String(curso.inscricoes)]),
  );

  const csv = linhas
    .map(linha => linha.map(celula => `"${celula.replace(/"/g, '""')}"`).join(';'))
    .join('\r\n');

  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `relatorio-deppi-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function RelatoriosPage() {
  return (
    <div>
      <PageHeader
        title="Relatórios"
        subtitle={`Gerado em ${dataPorExtenso()} · ${horaAtual()}`}
        action={<Button variant="secondary" leftIcon="download" onClick={exportarCsv}>Exportar relatórios</Button>}
      />

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
