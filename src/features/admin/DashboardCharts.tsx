import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card } from '../../shared/components/Card';
import { Icon } from '../../shared/components/Icon';
import { StatusChip } from '../../shared/components/StatusChip';
import { INSCRICOES_POR_SITUACAO, CURSOS_POR_SITUACAO } from '../../shared/data/mocks';
import './DashboardCharts.css';

const COR_INSCRICAO: Record<string, string> = {
  PENDENTE: 'var(--status-pending)',
  DEFERIDA: 'var(--status-deferred)',
  INDEFERIDA: 'var(--status-denied)',
  CANCELADA: 'var(--status-canceled)',
};

const COR_CURSO: Record<string, string> = {
  ANALISE: '#F5B544',
  ANDAMENTO: '#5CC98A',
  CONCLUIDO: '#7AA7F0',
  FECHADO: '#A3A3A3',
};

export function InscricoesPorSituacao({ action }: { action?: React.ReactNode }) {
  const maior = Math.max(...INSCRICOES_POR_SITUACAO.map(b => b.value));
  return (
    <Card title="Inscrições por situação" rightAction={action}>
      <div className="bars">
        {INSCRICOES_POR_SITUACAO.map(b => (
          <div key={b.status} className="bars__row">
            <StatusChip status={b.status} size="sm" />
            <div className="bars__track">
              <span style={{ width: `${(b.value / maior) * 100}%`, background: COR_INSCRICAO[b.status] }} />
            </div>
            <span className="bars__value mono">{b.value.toLocaleString('pt-BR')}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CursosPorSituacao() {
  const total = CURSOS_POR_SITUACAO.reduce((s, c) => s + c.value, 0);
  const data = CURSOS_POR_SITUACAO.map(c => ({ name: c.label, value: c.value, status: c.status }));

  return (
    <Card title="Cursos por situação">
      <div className="donut">
        <div className="donut__chart">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={70} outerRadius={100} stroke="none" startAngle={90} endAngle={-270}>
                {data.map(d => <Cell key={d.status} fill={COR_CURSO[d.status]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="donut__center">
            <span className="donut__num">{total}</span>
            <span className="donut__label">cursos</span>
          </div>
        </div>
        <div className="donut__legend">
          {CURSOS_POR_SITUACAO.map(c => (
            <div key={c.status} className="donut__legend-row">
              <Icon name="circle" size={10} color={COR_CURSO[c.status]} />
              <span className="donut__legend-name">{c.label}</span>
              <span className="donut__legend-num mono">{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
