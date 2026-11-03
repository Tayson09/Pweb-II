import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/components/Breadcrumb';
import { CursoForm } from './CursoForm';
import type { CursoFormData } from './CursoForm';
import { useDomain } from '../../shared/data/domain.store';

export function NovoCurso() {
  const nav = useNavigate();
  const addCurso = useDomain(s => s.addCurso);

  function criar(data: CursoFormData) {
    addCurso(data);
    nav('/cursos');
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Cursos', to: '/cursos' }, { label: 'Novo curso' }]} />
      <div style={{ marginBottom: 20 }}>
        <h1>Novo curso</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 4 }}>O curso é criado com status "Em análise".</p>
      </div>

      <CursoForm submitLabel="Criar curso" submitIcon="add" onCancel={() => nav('/cursos')} onSubmit={criar} />
    </div>
  );
}
