import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Banner } from '../../shared/components/Banner';
import { Button } from '../../shared/components/Button';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { StatusChip } from '../../shared/components/StatusChip';
import { useSession } from '../auth/session.store';
import { useDomain } from '../../shared/data/domain.store';
import type { EnrollmentStatus, Inscricao } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './MinhasInscricoesPage.css';

type Filtro = EnrollmentStatus | 'TODAS';

const filtros: Array<{ key: Filtro; label: string }> = [
  { key: 'TODAS', label: 'Todas' },
  { key: 'PENDENTE', label: 'Pendentes' },
  { key: 'DEFERIDA', label: 'Deferidas' },
  { key: 'INDEFERIDA', label: 'Indeferidas' },
  { key: 'CANCELADA', label: 'Canceladas' },
];

export function MinhasInscricoesPage() {
  const nav = useNavigate();
  const user = useSession(s => s.user)!;
  const inscricoes = useDomain(s => s.inscricoes);
  const cancelarInscricao = useDomain(s => s.cancelarInscricao);
  const [filtro, setFiltro] = useState<Filtro>('TODAS');
  const [busca, setBusca] = useState('');
  const [alvo, setAlvo] = useState<Inscricao | null>(null);

  const minhas = inscricoes
    .filter(inscricao => inscricao.alunoEmail === user.email)
    .filter(inscricao => filtro === 'TODAS' || inscricao.status === filtro)
    .filter(inscricao => inscricao.cursoNome.toLowerCase().includes(busca.trim().toLowerCase()))
    .sort((a, b) => b.data.localeCompare(a.data));

  function confirmarCancelamento() {
    if (!alvo) return;
    cancelarInscricao(alvo.id);
    setAlvo(null);
  }

  return (
    <div className="minhas-inscricoes">
      <PageHeader
        title="Minhas inscrições"
        subtitle="Acompanhe a situação das suas solicitações."
        action={<Button variant="secondary" leftIcon="school" onClick={() => nav('/cursos')}>Buscar cursos</Button>}
      />

      <nav className="minhas-inscricoes__tabs" aria-label="Filtrar minhas inscrições">
        {filtros.map(item => {
          const total = inscricoes.filter(i =>
            i.alunoEmail === user.email &&
            (item.key === 'TODAS' || i.status === item.key),
          ).length;
          return (
            <button type="button" key={item.key} className={filtro === item.key ? 'is-active' : ''} onClick={() => setFiltro(item.key)}>
              {item.label}<span>{total}</span>
            </button>
          );
        })}
      </nav>

      <div className="minhas-inscricoes__search">
        <SearchInput placeholder="Buscar por curso" value={busca} onChange={event => setBusca(event.target.value)} />
      </div>

      {minhas.length === 0 ? (
        <EmptyState
          icon="assignment"
          title="Nenhuma inscrição encontrada"
          description={busca ? 'Tente buscar por outro curso.' : 'Não há inscrições nesta situação.'}
          action={!busca ? <Button onClick={() => nav('/cursos')}>Ver cursos disponíveis</Button> : undefined}
        />
      ) : (
        <div className="minhas-inscricoes__table-wrap">
          <table className="minhas-inscricoes__table">
            <thead>
              <tr><th>Curso</th><th>Data da solicitação</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr>
            </thead>
            <tbody>
              {minhas.map(inscricao => (
                <tr key={inscricao.id}>
                  <td>
                    <button className="minhas-inscricoes__curso" type="button" onClick={() => nav(`/minhas-inscricoes/${inscricao.id}`)}>
                      <Avatar initials={inscricao.cursoNome.split(/\s+/).slice(0, 2).map(palavra => palavra[0]).join('').toUpperCase()} size={36} />
                      <span>{inscricao.cursoNome}</span>
                    </button>
                  </td>
                  <td className="mono">{dataCurta(inscricao.data)}</td>
                  <td><StatusChip status={inscricao.status} size="sm" /></td>
                  <td className="minhas-inscricoes__acoes">
                    <Button variant="ghost" size="sm" onClick={() => nav(`/minhas-inscricoes/${inscricao.id}`)}>Detalhes</Button>
                    {(inscricao.status === 'PENDENTE' || inscricao.status === 'DEFERIDA') && (
                      <Button variant="danger" size="sm" onClick={() => setAlvo(inscricao)}>Cancelar</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {alvo && (
        <div className="minhas-inscricoes__modal-backdrop" role="presentation" onClick={() => setAlvo(null)}>
          <div className="minhas-inscricoes__modal" role="dialog" aria-modal="true" aria-labelledby="cancelar-inscricao-title" onClick={event => event.stopPropagation()}>
            <h2 id="cancelar-inscricao-title">Cancelar inscrição</h2>
            <p>Deseja cancelar sua inscrição em <strong>{alvo.cursoNome}</strong>? Esta ação não poderá ser desfeita.</p>
            <Banner variant="warning">Após o cancelamento, será necessário realizar uma nova inscrição.</Banner>
            <div className="minhas-inscricoes__modal-actions">
              <Button variant="secondary" onClick={() => setAlvo(null)}>Voltar</Button>
              <Button variant="danger" onClick={confirmarCancelamento}>Cancelar inscrição</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
