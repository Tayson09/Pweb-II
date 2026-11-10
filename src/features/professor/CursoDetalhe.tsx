import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { Card } from '../../shared/components/Card';
import { Button } from '../../shared/components/Button';
import { Banner } from '../../shared/components/Banner';
import { Icon } from '../../shared/components/Icon';
import { StatusChip } from '../../shared/components/StatusChip';
import { EmptyState } from '../../shared/components/EmptyState';
import { useDomain } from '../../shared/data/domain.store';
import { dataCurta } from '../../shared/format';
import './CursoDetalhe.css';

const TAMANHO_MAX = 2 * 1024 * 1024; // 2 MB

export function CursoDetalhe() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const curso = useDomain(s => s.cursos.find(c => c.id === id));
  const removeCurso = useDomain(s => s.removeCurso);
  const updateCurso = useDomain(s => s.updateCurso);

  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

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

  function escolherImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite reescolher o mesmo arquivo
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErro('Selecione um arquivo de imagem válido.');
      return;
    }
    if (file.size > TAMANHO_MAX) {
      setErro('A imagem deve ter no máximo 2 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateCurso(curso!.id, { imagem: reader.result as string });
      setErro(null);
    };
    reader.onerror = () => setErro('Não foi possível ler a imagem.');
    reader.readAsDataURL(file);
  }

  function removerImagem() {
    updateCurso(curso!.id, { imagem: undefined });
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

      <div className="curso-detalhe__cover">
        {curso.imagem
          ? <img className="curso-detalhe__cover-img" src={curso.imagem} alt={curso.nome} />
          : (
            <div className="curso-detalhe__cover-vazio">
              <Icon name="image" size={28} color="var(--text-muted)" />
              <span>{curso.iniciais}</span>
            </div>
          )}
        <div className="curso-detalhe__cover-actions">
          <Button variant="secondary" size="sm" leftIcon="photo_camera" onClick={() => fileRef.current?.click()}>
            Trocar imagem
          </Button>
          {curso.imagem && (
            <Button variant="danger" size="sm" leftIcon="delete" onClick={removerImagem}>
              Remover
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={escolherImagem}
        />
      </div>

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
