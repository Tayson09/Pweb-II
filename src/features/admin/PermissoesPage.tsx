import { PageHeader } from '../../shared/components/PageHeader';
import './UsuariosPage.css';

const permissoes = [
  { cargo: 'ADMIN', descricao: 'Gestão técnica da plataforma', acesso: 'Usuários, cargos, auditoria e configurações' },
  { cargo: 'DEPPI', descricao: 'Gestão acadêmica e operacional', acesso: 'Cursos, instituições, inscrições e professores' },
  { cargo: 'PROFESSOR', descricao: 'Docência', acesso: 'Cursos atribuídos e atividades pedagógicas' },
  { cargo: 'ALUNO', descricao: 'Participação em cursos', acesso: 'Cursos disponíveis e inscrições próprias' },
];

export function PermissoesPage() {
  return (
    <div>
      <PageHeader
        title="Permissões"
        subtitle="Matriz de responsabilidades por cargo"
      />

      <div className="usuarios-table-wrap">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Responsabilidade</th>
              <th>Acesso autorizado</th>
            </tr>
          </thead>
          <tbody>
            {permissoes.map(item => (
              <tr key={item.cargo}>
                <td><span className="usuarios-cargo mono">{item.cargo}</span></td>
                <td>{item.descricao}</td>
                <td>{item.acesso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
