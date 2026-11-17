import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { StatCard } from '../../shared/components/StatCard';
import { StatusChip } from '../../shared/components/StatusChip';
import { EmptyState } from '../../shared/components/EmptyState';
import { useDomain } from '../../shared/data/domain.store';
import { useSession } from '../auth/session.store';
import { dataPorExtenso, primeiroNome } from '../../shared/format';
import type { CourseStatus } from '../../shared/types';
import './PainelProfessor.css';

const ORDEM_STATUS: CourseStatus[] = ['ANDAMENTO', 'ANALISE', 'CONCLUIDO', 'FECHADO'];

export function InicioProfessor() {
  const cursos = useDomain(s => s.cursos);
  const inscricoes = useDomain(s => s.inscricoes);
  const user = useSession(s => s.user)!;
  const nav = useNavigate();

  const emAndamento = cursos.filter(c => c.status === 'ANDAMENTO').length;
  const emAnalise = cursos.filter(c => c.status === 'ANALISE').length;

  const vagasTotal = cursos.reduce((soma, c) => soma + c.vagas, 0);
  const vagasOcupadas = cursos.reduce((soma, c) => soma + c.ocupadas, 0);
  const ocupacao = vagasTotal ? Math.round((vagasOcupadas / vagasTotal) * 100) : 0;

  const pendentes = inscricoes.filter(i => i.status === 'PENDENTE').length;

  // Visibilidade: turmas mais cheias primeiro, para acompanhar quais estão lotando.
  const porOcupacao = [...cursos]
    .map(c => ({ curso: c, taxa: c.vagas ? c.ocupadas / c.vagas : 0 }))
    .sort((a, b) => b.taxa - a.taxa)
    .slice(0, 5);

  const porStatus = ORDEM_STATUS
    .map(status => ({ status, total: cursos.filter(c => c.status === status).length }))
    .filter(linha => linha.total > 0);

  return (
    <div className="painel-prof">
      <PageHeader
        title={`Bom dia, ${primeiroNome(user.name)}`}
        subtitle={dataPorExtenso()}
        action={<Button leftIcon="add" onClick={() => nav('/cursos/novo')}>Novo curso</Button>}
      />

      <div className="painel-prof__stats">
        <StatCard
          icon="play_circle"
          label="Cursos em andamento"
          value={emAndamento}
          hint={`${cursos.length} no total`}
        />
        <StatCard
          icon="schedule"
          label="Em análise"
          value={emAnalise}
          valueColor="var(--status-analysis)"
          hint="aguardando o DEPPI"
        />
        <StatCard
          icon="groups"
          label="Ocupação das vagas"
          value={`${ocupacao}%`}
          hint={`${vagasOcupadas} de ${vagasTotal} vagas`}
        />
        <StatCard
          icon="inbox"
          label="Inscrições pendentes"
          value={pendentes}
          valueColor={pendentes ? 'var(--status-pending)' : undefined}
          hint="somando todos os cursos"
        />
      </div>

      <div className="painel-prof__grid">
        <Card
          title="Ocupação das turmas"
          rightAction={<button type="button" onClick={() => nav('/cursos')}>Ver cursos</button>}
        >
          {porOcupacao.length === 0 ? (
            <EmptyState icon="school" title="Nenhum curso cadastrado" />
          ) : (
            <ul className="painel-prof__list">
              {porOcupacao.map(({ curso, taxa }) => {
                const pct = Math.round(taxa * 100);
                return (
                  <li
                    className="painel-prof__item"
                    key={curso.id}
                    onClick={() => nav(`/cursos/${curso.id}`)}
                  >
                    <div className="painel-prof__item-head">
                      <span className="painel-prof__item-name">{curso.nome}</span>
                      <span className="painel-prof__item-count">{curso.ocupadas}/{curso.vagas}</span>
                    </div>
                    <div className="painel-prof__bar" aria-hidden>
                      <div
                        className="painel-prof__bar-fill"
                        style={{ width: `${pct}%`, background: pct >= 90 ? 'var(--danger)' : 'var(--accent)' }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card title="Situação dos cursos">
          {porStatus.length === 0 ? (
            <EmptyState icon="inbox" title="Sem cursos para resumir" />
          ) : (
            <ul className="painel-prof__status-list">
              {porStatus.map(({ status, total }) => (
                <li className="painel-prof__status-item" key={status}>
                  <StatusChip status={status} />
                  <span className="painel-prof__status-count">{total}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
