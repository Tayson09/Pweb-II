import { PageHeader } from '../../shared/components/PageHeader';
import { dataCurta } from '../../shared/format';
import './UsuariosPage.css';

const eventos = [
  { id: '1', data: '2026-11-17', usuario: 'Administrador', acao: 'Login no sistema', alvo: 'Sistema', tipo: 'ACESSO' },
  { id: '2', data: '2026-11-15', usuario: 'Administrador', acao: 'Consultou lista de usuários', alvo: 'Usuários', tipo: 'CONSULTA' },
  { id: '3', data: '2026-11-12', usuario: 'Administrador', acao: 'Concedeu cargo DEPPI', alvo: 'Roberta Alves Tavares', tipo: 'PERMISSAO' },
];

export function AuditoriaPage() {
  return (
    <div>
      <PageHeader
        title="Auditoria"
        subtitle={`${eventos.length} eventos recentes`}
      />

      <div className="usuarios-table-wrap">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Usuário responsável</th>
              <th>Ação</th>
              <th>Alvo</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map(evento => (
              <tr key={evento.id}>
                <td className="mono">{dataCurta(evento.data)}</td>
                <td>{evento.usuario}</td>
                <td>{evento.acao}</td>
                <td>{evento.alvo}</td>
                <td><span className="usuarios-cargo mono">{evento.tipo}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
