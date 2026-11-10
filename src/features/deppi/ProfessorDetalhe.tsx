import { useNavigate, useParams } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Button } from '../../shared/components/Button';
import { Card } from '../../shared/components/Card';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { useDomain } from '../../shared/data/domain.store';
import './ProfessoresPage.css';

export function ProfessorDetalhe() {
  const { id } = useParams();
  const nav = useNavigate();
  const professor = useDomain(state => state.professores.find(item => item.id === id));

  if (!professor) return <EmptyState icon="badge" title="Professor não encontrado" action={<Button onClick={() => nav('/professores')}>Voltar</Button>} />;

  return (
    <div className="professor-detalhe">
      <button className="professor-detalhe__back" type="button" onClick={() => nav('/professores')}>← Professores</button>
      <PageHeader title={professor.nome} subtitle={`SIAPE ${professor.siape}`} />
      <div className="professor-detalhe__grid">
        <Card title="Dados funcionais">
          <dl className="professor-detalhe__data">
            <div><dt>Nome</dt><dd>{professor.nome}</dd></div>
            <div><dt>SIAPE</dt><dd className="mono">{professor.siape}</dd></div>
            <div><dt>E-mail institucional</dt><dd>{professor.email}</dd></div>
            <div><dt>Titulação</dt><dd>{professor.titulacao || 'Não informada'}</dd></div>
            <div><dt>Participa do PGD</dt><dd>{professor.participaPGD ? 'Sim' : 'Não'}</dd></div>
          </dl>
        </Card>
        <Card title="Perfil">
          <div className="professor-detalhe__profile">
            <Avatar initials={professor.iniciais} size={64} />
            <p>Professor cadastrado no módulo DEPPI.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
