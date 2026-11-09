import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { EmptyState } from '../../shared/components/EmptyState';
import { Button } from '../../shared/components/Button';
import { CursoForm } from './CursoForm';
import type { CursoFormData } from './CursoForm';
import { useDomain } from '../../shared/data/domain.store';

export function EditarCurso() {
  const nav = useNavigate();
  const { id } = useParams<{ id: string }>();
  const curso = useDomain(s => s.cursos.find(c => c.id === id));
  const updateCurso = useDomain(s => s.updateCurso);

  if (!curso) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: 'Editar curso' }]} />
        <EmptyState
          icon="search_off"
          title="Curso não encontrado"
          description="O curso que você tentou editar não existe mais."
          action={<Button onClick={() => nav('/cursos')}>Voltar aos cursos</Button>}
        />
      </div>
    );
  }

  function salvar(data: CursoFormData) {
    updateCurso(curso!.id, data);
    nav(`/cursos/${curso!.id}`);
  }

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Cursos', to: '/cursos' },
          { label: curso.nome, to: `/cursos/${curso.id}` },
          { label: 'Editar' },
        ]}
      />
      <div style={{ marginBottom: 20 }}>
        <h1>Editar curso</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>Altere as informações e salve as mudanças.</p>
      </div>

      <CursoForm
        inicial={curso}
        submitLabel="Salvar alterações"
        submitIcon="save"
        onCancel={() => nav(`/cursos/${curso.id}`)}
        onSubmit={salvar}
      />
    </div>
  );
}
