import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/components/Button';
import { CourseCard } from '../../shared/components/CourseCard';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { Select } from '../../shared/components/Select';
import { useDomain } from '../../shared/data/domain.store';
import type { CourseStatus } from '../../shared/data/domain.store';
import './CursosAdmin.css';

const statusOptions: Array<{ value: CourseStatus | 'TODOS'; label: string }> = [
  { value: 'TODOS', label: 'Todos os status' },
  { value: 'ANALISE', label: 'Em análise' },
  { value: 'ANDAMENTO', label: 'Em andamento' },
  { value: 'CONCLUIDO', label: 'Concluído' },
  { value: 'FECHADO', label: 'Fechado' },
];

export function CursosAdmin() {
  const cursos = useDomain(s => s.cursos);
  const nav = useNavigate();
  const [busca, setBusca] = useState('');
  const [status, setStatus] = useState<CourseStatus | 'TODOS'>('TODOS');

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return cursos.filter(curso => {
      const correspondeBusca = !termo
        || `${curso.nome} ${curso.instituicao}`.toLowerCase().includes(termo);
      return correspondeBusca && (status === 'TODOS' || curso.status === status);
    });
  }, [busca, cursos, status]);

  return (
    <div>
      <PageHeader
        title="Cursos"
        subtitle={`${cursos.length} cursos cadastrados`}
        action={<Button leftIcon="add" onClick={() => nav('/cursos/novo')}>Novo curso</Button>}
      />

      <div className="cursos-admin__filters">
        <SearchInput
          placeholder="Buscar por curso ou campus"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
        <Select
          aria-label="Filtrar cursos por status"
          value={status}
          onChange={event => setStatus(event.target.value as CourseStatus | 'TODOS')}
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </Select>
      </div>

      {filtrados.length === 0
        ? <EmptyState
            icon="school"
            title="Nenhum curso encontrado"
            description="Tente alterar a busca ou o filtro de status."
          />
        : (
          <>
            <p className="cursos-admin__result-count">
              {filtrados.length} {filtrados.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
            </p>
            <div className="cursos-grid">
              {filtrados.map(curso => <CourseCard key={curso.id} curso={curso} />)}
            </div>
          </>
        )}
    </div>
  );
}
