import { useState } from 'react';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { CourseCard } from '../../shared/components/CourseCard';
import { EmptyState } from '../../shared/components/EmptyState';
import { useDomain } from '../../shared/data/domain.store';
import '../deppi/cursos-grid.css';

export function CursosAluno() {
  const cursos = useDomain(s => s.cursos);
  const [busca, setBusca] = useState('');

  const disponiveis = cursos
    .filter(curso => curso.status === 'ANDAMENTO' && curso.ocupadas < curso.vagas)
    .filter(curso => `${curso.nome} ${curso.instituicao}`.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Cursos disponíveis"
        subtitle="Encontre cursos com inscrições abertas e vagas disponíveis."
      />

      <div style={{ marginBottom: 16, maxWidth: 420 }}>
        <SearchInput
          placeholder="Buscar por curso ou campus"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
      </div>

      {disponiveis.length === 0
        ? <EmptyState
            icon="school"
            title={busca ? 'Nenhum curso encontrado' : 'Nenhum curso disponível no momento'}
            description={busca ? 'Tente buscar por outro nome de curso ou campus.' : 'Novos cursos com vagas disponíveis aparecerão aqui.'}
          />
        : <div className="cursos-grid">{disponiveis.map(curso => <CourseCard key={curso.id} curso={curso} />)}</div>}
    </div>
  );
}
