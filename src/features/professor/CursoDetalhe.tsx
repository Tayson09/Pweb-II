import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { Banner } from '../../shared/components/Banner';
import { StatusChip } from '../../shared/components/StatusChip';
import { EmptyState } from '../../shared/components/EmptyState';
import { useDomain } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './CursoDetalhe.css';

export function CursoDetalhe() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const curso = useDomain(s => s.cursos.find(c => c.id === id));
  const removeCurso = useDomain(s => s.removeCurso);

  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!curso) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: 'Curso' }]} />
        <EmptyState
          icon="search_off"
          title="Curso não encontrado"
          description="O curso pode ter sido excluído."
          action={<Button onClick={() => nav('/cursos')}>Voltar aos cursos</Button>}
        />
      </div>
    );
  }

  function excluir() {
    const ok = removeCurso(curso!.id);
    if (!ok) {
      setConfirmando(false);
      setErro('Não é possível excluir: há inscrições vinculadas a este curso.');
      return;
    }
    nav('/cursos');
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: curso.nome }]} />

      <div className="curso-detalhe__head">
        <div>
          <h1>{curso.nome}</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>{curso.instituicao}</p>
        </div>
        <div className="curso-detalhe__actions">
          <StatusChip status={curso.status} />
          <Button variant="secondary" leftIcon="edit" onClick={() => nav(`/cursos/${curso.id}/editar`)}>
            Editar
          </Button>
          <Button variant="danger" leftIcon="delete" onClick={() => { setErro(null); setConfirmando(true); }}>
            Excluir
          </Button>
        </div>
      </div>

      {erro && <div style={{ marginBottom: 16 }}><Banner variant="danger">{erro}</Banner></div>}

      <Card title="Informações">
        <dl className="curso-detalhe__grid">
          <div><dt>Instituição</dt><dd>{curso.instituicao}</dd></div>
          <div><dt>Carga horária</dt><dd>{curso.cargaHoraria} h</dd></div>
          <div><dt>Período</dt><dd>{dataCurta(curso.periodoIni)} a {dataCurta(curso.periodoFim)}</dd></div>
          <div><dt>Horário</dt><dd>{curso.horarioIni} às {curso.horarioFim}</dd></div>
          <div><dt>Vagas</dt><dd>{curso.ocupadas}/{curso.vagas}</dd></div>
          <div><dt>Situação</dt><dd><StatusChip status={curso.status} size="sm" /></dd></div>
        </dl>
      </Card>

      {confirmando && (
        <div className="curso-detalhe__confirm" role="dialog" aria-modal="true">
          <Card title="Excluir curso">
            <p style={{ color: 'var(--text-muted)' }}>
              Tem certeza que deseja excluir <strong>{curso.nome}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="curso-detalhe__confirm-actions">
              <Button variant="secondary" onClick={() => setConfirmando(false)}>Cancelar</Button>
              <Button variant="danger" leftIcon="delete" onClick={excluir}>Excluir curso</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
