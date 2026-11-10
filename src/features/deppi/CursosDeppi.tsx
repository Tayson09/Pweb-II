import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../../shared/components/Banner';
import { Button } from '../../shared/components/Button';
import { CourseCard } from '../../shared/components/CourseCard';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { useDomain } from '../../shared/data/domain.store';
import './cursos-grid.css';

export function CursosDeppi() {
  const cursos = useDomain(s => s.cursos);
  const nav = useNavigate();
  const [busca, setBusca] = useState('');
  const instituicoes = new Set(cursos.map(curso => curso.instituicao)).size;
  const filtrados = cursos.filter(curso => curso.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Cursos"
        subtitle={`${cursos.length} cursos em ${instituicoes} instituições`}
        action={<Button leftIcon="add" onClick={() => nav('/cursos/novo')}>Novo curso</Button>}
      />

      <Banner>
        P1 · A alteração de status está desativada até a correção da API. Novos cursos ficam "Em análise".
      </Banner>

      <div className="cursos-deppi__search">
        <SearchInput
          placeholder="Buscar por nome"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
      </div>

      {filtrados.length === 0
        ? <EmptyState
            icon="school"
            title="Nenhum curso encontrado"
            description="Tente buscar por outro nome de curso."
          />
        : <div className="cursos-grid">{filtrados.map(curso => <CourseCard key={curso.id} curso={curso} />)}</div>}
    </div>
  );
}
