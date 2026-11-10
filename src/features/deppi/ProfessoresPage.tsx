import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../../shared/components/Avatar';
import { Button } from '../../shared/components/Button';
import { EmptyState } from '../../shared/components/EmptyState';
import { PageHeader } from '../../shared/components/PageHeader';
import { SearchInput } from '../../shared/components/SearchInput';
import { useDomain } from '../../shared/data/domain.store';
import './ProfessoresPage.css';

export function ProfessoresPage() {
  const professores = useDomain(s => s.professores);
  const nav = useNavigate();
  const [busca, setBusca] = useState('');
  const filtrados = professores.filter(professor =>
    `${professor.nome} ${professor.siape} ${professor.email}`.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Professores"
        subtitle={`${professores.length} professores`}
        action={<Button leftIcon="add" onClick={() => nav('/professores/novo')}>Novo professor</Button>}
      />

      <div className="professores__search">
        <SearchInput
          placeholder="Buscar por nome ou SIAPE"
          value={busca}
          onChange={event => setBusca(event.target.value)}
        />
      </div>

      {filtrados.length === 0 ? (
        <EmptyState icon="badge" title="Nenhum professor encontrado" description="Tente buscar por outro nome ou SIAPE." />
      ) : (
        <div className="professores-table-wrap">
          <table className="professores-table">
            <thead>
              <tr><th>Professor</th><th>SIAPE</th><th>E-mail institucional</th><th>PGD</th></tr>
            </thead>
            <tbody>
              {filtrados.map(professor => (
                <tr key={professor.id} onClick={() => nav(`/professores/${professor.id}`)}>
                  <td>
                    <div className="professor-person">
                      <Avatar initials={professor.iniciais} size={36} />
                      <span>{professor.nome}</span>
                    </div>
                  </td>
                  <td className="mono">{professor.siape}</td>
                  <td>{professor.email}</td>
                  <td>{professor.participaPGD ? 'Sim' : 'Não'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
