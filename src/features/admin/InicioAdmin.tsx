import { PageHeader } from '../../shared/components/PageHeader';
import { StatCard } from '../../shared/components/StatCard';
import { Card } from '../../shared/components/Card';
import { useDomain } from '../../shared/data/domain.store';
import { dataPorExtenso } from '../../shared/format';
import './dashboard.css';

export function InicioAdmin() {
  const usuarios = useDomain(s => s.usuarios);
  const totais = [
    { label: 'Usuários cadastrados', value: String(usuarios.length) },
    { label: 'Administradores', value: String(usuarios.filter(u => u.cargos.includes('ADMIN')).length) },
    { label: 'Equipe DEPPI', value: String(usuarios.filter(u => u.cargos.includes('DEPPI')).length) },
    { label: 'Professores', value: String(usuarios.filter(u => u.cargos.includes('PROFESSOR')).length) },
    { label: 'Alunos', value: String(usuarios.filter(u => u.cargos.includes('ALUNO')).length) },
  ];

  return (
    <div>
      <PageHeader
        title="Bom dia, administrador"
        subtitle={dataPorExtenso()}
      />

      <div className="stat-grid">
        {totais.map(t => (
          <StatCard key={t.label} label={t.label} value={t.value} />
        ))}
      </div>

      <div className="dash-grid">
        <Card title="Estado do sistema">
          <div className="admin-health-row"><span>Autenticação</span><strong className="admin-health-ok">Operacional</strong></div>
          <div className="admin-health-row"><span>Armazenamento de dados</span><strong className="admin-health-ok">Operacional</strong></div>
          <div className="admin-health-row"><span>Auditoria</span><strong className="admin-health-ok">Coletando eventos</strong></div>
        </Card>
        <Card title="Resumo administrativo">
          <p className="admin-summary">Use Usuários para gerenciar contas e Permissões para consultar o acesso de cada cargo.</p>
        </Card>
      </div>
    </div>
  );
}
