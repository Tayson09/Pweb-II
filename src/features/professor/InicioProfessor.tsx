import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { Button } from '../../shared/components/Button';
import { SearchInput } from '../../shared/components/SearchInput';
import { Banner } from '../../shared/components/Banner';
import { CourseCard } from '../../shared/components/CourseCard';
import { EmptyState } from '../../shared/components/EmptyState';
import { useDomain } from '../../shared/data/domain.store';
import { useSession } from '../auth/session.store';
import { primeiroNome } from '../../shared/format';
import '../deppi/cursos-grid.css';

export function InicioProfessor() {
  const cursos = useDomain(s => s.cursos);
  const user = useSession(s => s.user)!;
  const nav = useNavigate();
  const [busca, setBusca] = useState('');

  const filtrados = cursos.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div>
      <PageHeader
        title={`Bom dia, ${primeiroNome(user.name)}`}
        subtitle="Cursos de extensão cadastrados"
        action={<Button leftIcon="add" onClick={() => nav('/cursos/novo')}>Novo curso</Button>}
      />

      <div style={{ marginBottom: 16, maxWidth: 420 }}>
        <SearchInput placeholder="Buscar por nome" value={busca} onChange={e => setBusca(e.target.value)} />
      </div>

      {filtrados.length === 0
        ? <EmptyState icon="school" title="Nenhum curso encontrado" />
        : <div className="cursos-grid">{filtrados.map(c => <CourseCard key={c.id} curso={c} />)}</div>}

      <div style={{ marginTop: 20 }}>
        <Banner>O sistema ainda não registra quem criou cada curso, por isso todos aparecem aqui.</Banner>
      </div>
    </div>
  );
}
