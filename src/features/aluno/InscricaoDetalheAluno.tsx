import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Banner } from '../../shared/components/Banner';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { EmptyState } from '../../shared/components/EmptyState';
import { StatusChip } from '../../shared/components/StatusChip';
import { useSession } from '../auth/session.store';
import { useDomain } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './InscricaoDetalheAluno.css';

export function InscricaoDetalheAluno() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useSession(s => s.user)!;
  const inscricao = useDomain(s => s.inscricoes.find(item =>
    item.id === id && item.alunoEmail === user.email,
  ));
  const curso = useDomain(s => inscricao ? s.cursos.find(item => item.id === inscricao.cursoId) : undefined);
  const cancelarInscricao = useDomain(s => s.cancelarInscricao);
  const [confirmando, setConfirmando] = useState(false);

  if (!inscricao) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Minhas inscrições', to: '/minhas-inscricoes' }, { label: 'Inscrição' }]} />
        <EmptyState
          icon="search_off"
          title="Inscrição não encontrada"
          description="Esta inscrição não existe ou não pertence ao seu usuário."
          action={<Button onClick={() => nav('/minhas-inscricoes')}>Voltar às inscrições</Button>}
        />
      </div>
    );
  }

  function cancelar() {
    cancelarInscricao(inscricao!.id);
    setConfirmando(false);
  }

  return (
    <div className="inscricao-detalhe">
      <Breadcrumb items={[{ label: 'Minhas inscrições', to: '/minhas-inscricoes' }, { label: inscricao.cursoNome }]} />

      <div className="inscricao-detalhe__head">
        <div>
          <h1>{inscricao.cursoNome}</h1>
          <p>Solicitação realizada em {dataCurta(inscricao.data)}</p>
        </div>
        <StatusChip status={inscricao.status} />
      </div>

      {inscricao.status === 'INDEFERIDA' && inscricao.motivoIndeferimento && (
        <div className="inscricao-detalhe__banner">
          <Banner variant="danger">Motivo da indeferimento: {inscricao.motivoIndeferimento}</Banner>
        </div>
      )}

      {inscricao.status === 'PENDENTE' && (
        <div className="inscricao-detalhe__banner">
          <Banner variant="info">Sua inscrição está aguardando análise da equipe DEPPI.</Banner>
        </div>
      )}

      {inscricao.status === 'DEFERIDA' && (
        <div className="inscricao-detalhe__banner">
          <Banner variant="success">Sua inscrição foi aceita.</Banner>
        </div>
      )}

      <Card title="Dados da inscrição">
        <dl className="inscricao-detalhe__grid">
          <div><dt>Status</dt><dd><StatusChip status={inscricao.status} size="sm" /></dd></div>
          <div><dt>Data da solicitação</dt><dd>{dataCurta(inscricao.data)}</dd></div>
          <div><dt>Matrícula</dt><dd className="mono">{inscricao.matricula}</dd></div>
          <div><dt>Aluno</dt><dd>{inscricao.alunoNome}</dd></div>
        </dl>
      </Card>

      {curso && (
        <Card title="Informações do curso" className="inscricao-detalhe__curso">
          <dl className="inscricao-detalhe__grid">
            <div><dt>Instituição</dt><dd>{curso.instituicao}</dd></div>
            <div><dt>Carga horária</dt><dd>{curso.cargaHoraria} horas</dd></div>
            <div><dt>Período</dt><dd>{dataCurta(curso.periodoIni)} a {dataCurta(curso.periodoFim)}</dd></div>
            <div><dt>Horário</dt><dd>{curso.horarioIni} às {curso.horarioFim}</dd></div>
          </dl>
        </Card>
      )}

      {!confirmando ? (
        <div className="inscricao-detalhe__actions">
          <Button variant="secondary" onClick={() => nav('/minhas-inscricoes')}>Voltar</Button>
          {(inscricao.status === 'PENDENTE' || inscricao.status === 'DEFERIDA') && (
            <Button variant="danger" onClick={() => setConfirmando(true)}>Cancelar inscrição</Button>
          )}
        </div>
      ) : (
        <Card title="Confirmar cancelamento" className="inscricao-detalhe__confirm">
          <p>Deseja cancelar esta inscrição? Esta ação não poderá ser desfeita.</p>
          <div className="inscricao-detalhe__actions">
            <Button variant="secondary" onClick={() => setConfirmando(false)}>Voltar</Button>
            <Button variant="danger" onClick={cancelar}>Confirmar cancelamento</Button>
          </div>
        </Card>
      )}
    </div>
  );
}
